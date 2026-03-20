'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CHARITIES = [
  { id: 'charity-1', name: 'Cancer Research UK', description: 'Fighting cancer through research', emoji: '🎗️' },
  { id: 'charity-2', name: 'Red Cross', description: 'Helping communities in crisis', emoji: '🔴' },
  { id: 'charity-3', name: 'WWF', description: 'Protecting wildlife and nature', emoji: '🐼' },
  { id: 'charity-4', name: 'UNICEF', description: 'Helping children worldwide', emoji: '👶' },
  { id: 'charity-5', name: 'Doctors Without Borders', description: 'Medical aid where needed most', emoji: '🏥' },
  { id: 'charity-6', name: 'Save The Children', description: 'Giving children a better future', emoji: '❤️' },
]

export default function Charity() {
  const [selected, setSelected] = useState<string | null>(null)
  const [percentage, setPercentage] = useState(10)
  const [user, setUser] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data: profile } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()
      if (profile) {
        setPercentage(profile.charity_percentage || 10)
        setSelected(profile.charity_id || null)
      }
    }
    getUser()
  }, [])

  const handleSave = async () => {
    if (!selected) return
    setLoading(true)
    setMessage('')
    const { error } = await supabase
      .from('profiles')
      .update({
        charity_id: selected,
        charity_percentage: percentage
      })
      .eq('id', user.id)
    if (error) {
      setMessage('Error saving: ' + error.message)
    } else {
      setMessage('Charity saved successfully! ✅')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">GolfGives</h1>
        <Link href="/dashboard" className="px-4 py-2 border border-green-700 text-green-700 rounded-lg hover:bg-green-50">
          Back to Dashboard
        </Link>
      </nav>
      <div className="max-w-3xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Charity</h2>
        <p className="text-gray-500 mb-8">Select a charity to support with your subscription</p>
        {message && (
          <p className={`mb-6 text-sm font-semibold ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {CHARITIES.map(charity => (
            <div
              key={charity.id}
              onClick={() => setSelected(charity.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition ${selected === charity.id ? 'border-green-700 bg-green-50' : 'bg-white hover:shadow-md'}`}
            >
              <div className="text-3xl mb-2">{charity.emoji}</div>
              <h3 className="font-bold text-gray-800 mb-1">{charity.name}</h3>
              <p className="text-gray-500 text-sm">{charity.description}</p>
              {selected === charity.id && (
                <p className="text-green-700 font-semibold text-sm mt-2">✅ Selected</p>
              )}
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-2xl border mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Donation Percentage</h3>
          <div className="flex items-center gap-4">
            <input
              type="range" min="10" max="50"
              value={percentage}
              onChange={e => setPercentage(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-2xl font-bold text-green-700 min-w-16">{percentage}%</span>
          </div>
          <p className="text-gray-400 text-sm mt-2">Minimum donation is 10%</p>
        </div>
        <button
          onClick={handleSave}
          disabled={!selected || loading}
          className="w-full px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Charity Selection'}
        </button>
      </div>
    </div>
  )
}