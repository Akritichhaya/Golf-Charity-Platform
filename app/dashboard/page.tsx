'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [scores, setScores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      const { data: profile } = await supabase
        .from('profiles').select('*').eq('id', user.id).single()
      setProfile(profile)
      const { data: scores } = await supabase
        .from('scores').select('*').eq('user_id', user.id)
        .order('score_date', { ascending: false }).limit(5)
      setScores(scores || [])
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-green-700 text-xl">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">GolfGives</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600">Hi, {profile?.full_name}!</span>
          <button onClick={handleLogout}
            className="px-4 py-2 text-red-500 border border-red-500 rounded-lg hover:bg-red-50">
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-gray-500 text-sm mb-1">Subscription</p>
            <p className="text-2xl font-bold text-green-700 capitalize">
              {profile?.subscription_status || 'Inactive'}
            </p>
            <p className="text-gray-400 text-sm capitalize">{profile?.subscription_plan} plan</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-gray-500 text-sm mb-1">Scores Entered</p>
            <p className="text-2xl font-bold text-green-700">{scores.length}/5</p>
            <p className="text-gray-400 text-sm">This month</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-gray-500 text-sm mb-1">Charity Donation</p>
            <p className="text-2xl font-bold text-green-700">{profile?.charity_percentage}%</p>
            <p className="text-gray-400 text-sm">of subscription</p>
          </div>
        </div>

        {/* Scores Section */}
        <div className="bg-white p-6 rounded-2xl border mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">My Golf Scores</h2>
            <Link href="/scores"
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 text-sm">
              + Add Score
            </Link>
          </div>
          {scores.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No scores yet — add your first score!</p>
          ) : (
            <div className="space-y-3">
              {scores.map((score, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">{score.score_date}</span>
                  <span className="text-2xl font-bold text-green-700">{score.score}</span>
                  <span className="text-gray-400 text-sm">Stableford</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Draw</h2>
            <p className="text-gray-500 mb-4">Next draw coming soon! Make sure your scores are entered.</p>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <p className="text-green-700 font-semibold">🎉 Prize Pool Growing!</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Charity</h2>
            <p className="text-gray-500 mb-4">You are donating {profile?.charity_percentage}% of your subscription.</p>
            <Link href="/charity"
              className="block text-center px-4 py-2 border border-green-700 text-green-700 rounded-lg hover:bg-green-50">
              Change Charity
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
// ```

// Press **Ctrl + S** to save!

// ---

// ## Check in browser 👇
// ```
// http://localhost:3000/dashboard