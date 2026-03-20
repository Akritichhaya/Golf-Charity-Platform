'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Scores() {
  const [scores, setScores] = useState<any[]>([])
  const [score, setScore] = useState('')
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      setUser(user)
      fetchScores(user.id)
    }
    getUser()
  }, [])

  const fetchScores = async (userId: string) => {
    const { data } = await supabase
      .from('scores').select('*')
      .eq('user_id', userId)
      .order('score_date', { ascending: false })
      .limit(5)
    setScores(data || [])
  }

  const handleAddScore = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const scoreNum = parseInt(score)
    if (scoreNum < 1 || scoreNum > 45) {
      setMessage('Score must be between 1 and 45!')
      setLoading(false)
      return
    }
    if (scores.length >= 5) {
      const oldest = scores[scores.length - 1]
      await supabase.from('scores').delete().eq('id', oldest.id)
    }
    const { error } = await supabase.from('scores').insert({
      user_id: user.id,
      score: scoreNum,
      score_date: date,
    })
    if (error) {
      setMessage('Error adding score!')
    } else {
      setMessage('Score added successfully!')
      setScore('')
      setDate('')
      fetchScores(user.id)
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
      <div className="max-w-2xl mx-auto px-8 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Golf Scores</h2>
        <div className="bg-white p-6 rounded-2xl border mb-8">
          <h3 className="text-xl font-bold mb-4">Add New Score</h3>
          {message && (
            <p className={`text-sm mb-4 ${message.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          )}
          <form onSubmit={handleAddScore} className="flex flex-col gap-4">
            <div>
              <label className="text-gray-600 text-sm mb-1 block">Score (1-45 Stableford)</label>
              <input
                type="number" min="1" max="45"
                placeholder="Enter score (1-45)"
                value={score}
                onChange={e => setScore(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="text-gray-600 text-sm mb-1 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <button type="submit" disabled={loading}
              className="px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold disabled:opacity-50">
              {loading ? 'Adding...' : '+ Add Score'}
            </button>
          </form>
        </div>
        <div className="bg-white p-6 rounded-2xl border">
          <h3 className="text-xl font-bold mb-4">Last 5 Scores</h3>
          {scores.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No scores yet!</p>
          ) : (
            <div className="space-y-3">
              {scores.map((s, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-500">{s.score_date}</span>
                  <span className="text-3xl font-bold text-green-700">{s.score}</span>
                  <span className="text-gray-400 text-sm">Stableford</span>
                </div>
              ))}
            </div>
          )}
          <p className="text-gray-400 text-sm mt-4 text-center">
            {scores.length}/5 scores entered — new score replaces oldest automatically
          </p>
        </div>
      </div>
    </div>
  )
}
// ```

// **Press Ctrl + S to save!**

// ---

// ## Check in browser 👇
// ```
// http://localhost:3000/scores