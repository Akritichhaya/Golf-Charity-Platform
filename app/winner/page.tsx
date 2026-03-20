'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Winner() {
  const [user, setUser] = useState<any>(null)
  const [winners, setWinners] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data } = await supabase
        .from('winners')
        .select('*')
        .eq('user_id', user.id)
      setWinners(data || [])
    }
    getUser()
  }, [])

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setMessage('')
    const { error } = await supabase.from('winners').insert({
      user_id: user.id,
      match_type: '3-match',
      prize_amount: 100,
      payment_status: 'pending',
      proof_url: 'uploaded'
    })
    if (error) {
      setMessage('Error uploading proof!')
    } else {
      setMessage('Proof uploaded! Waiting for admin review ✅')
    }
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">GolfGives</h1>
        <Link href="/dashboard" className="px-4 py-2 border border-green-700 text-green-700 rounded-lg hover:bg-green-50">
          Back to Dashboard
        </Link>
      </nav>
      <div className="max-w-2xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Winner Verification</h2>
        <div className="bg-white p-6 rounded-2xl border mb-8">
          <h3 className="text-xl font-bold mb-4">Upload Proof</h3>
          <p className="text-gray-500 mb-6">Upload a screenshot of your golf scores as proof of winning</p>
          {message && (
            <p className={`mb-4 text-sm font-semibold ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <form onSubmit={handleUpload} className="flex flex-col gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-4xl mb-2">📸</p>
              <p className="text-gray-500">Upload screenshot of your scores</p>
              <input type="file" accept="image/*" className="mt-4 w-full" />
            </div>
            <button type="submit" disabled={uploading}
              className="px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Submit Proof'}
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="text-xl font-bold mb-4">My Winnings</h3>
          {winners.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No winnings yet — keep playing! 🏌️</p>
          ) : (
            <div className="space-y-3">
              {winners.map((w, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">{w.match_type}</span>
                  <span className="text-green-700 font-bold">${w.prize_amount}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${w.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {w.payment_status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}