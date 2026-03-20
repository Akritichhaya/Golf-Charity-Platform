'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Admin() {
  const [users, setUsers] = useState<any[]>([])
  const [scores, setScores] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [drawNumbers, setDrawNumbers] = useState<number[]>([])
  const [drawStatus, setDrawStatus] = useState('')
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data: profiles } = await supabase.from('profiles').select('*')
      setUsers(profiles || [])
      const { data: scores } = await supabase.from('scores').select('*')
      setScores(scores || [])
      setLoading(false)
    }
    getData()
  }, [])

  const runDraw = () => {
    const numbers = Array.from({length: 5}, () => Math.floor(Math.random() * 45) + 1)
    setDrawNumbers(numbers)
    setDrawStatus('Draw completed! Results published!')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-green-700 text-xl">Loading...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-700">GolfGives Admin</h1>
        <span className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-semibold">Admin Panel</span>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-gray-500 text-sm mb-1">Total Users</p>
            <p className="text-4xl font-bold text-green-700">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-gray-500 text-sm mb-1">Total Scores</p>
            <p className="text-4xl font-bold text-green-700">{scores.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border text-center">
            <p className="text-gray-500 text-sm mb-1">Prize Pool</p>
            <p className="text-4xl font-bold text-green-700">
              ${(users.length * 9.99 * 0.4).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Draw Engine */}
        <div className="bg-white p-6 rounded-2xl border mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Monthly Draw Engine</h2>
          <button onClick={runDraw}
            className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold mb-4">
            🎰 Run Monthly Draw
          </button>
          {drawNumbers.length > 0 && (
            <div>
              <p className="text-gray-600 mb-3">Draw Numbers:</p>
              <div className="flex gap-3 mb-3">
                {drawNumbers.map((n, i) => (
                  <span key={i} className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-lg font-bold">
                    {n}
                  </span>
                ))}
              </div>
              <p className="text-green-600 font-semibold">{drawStatus}</p>
            </div>
          )}
        </div>

        {/* Users Table */}
        <div className="bg-white p-6 rounded-2xl border mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-500">Name</th>
                  <th className="text-left py-3 text-gray-500">Plan</th>
                  <th className="text-left py-3 text-gray-500">Status</th>
                  <th className="text-left py-3 text-gray-500">Charity %</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">{user.full_name || 'N/A'}</td>
                    <td className="py-3 capitalize">{user.subscription_plan || 'N/A'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.subscription_status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {user.subscription_status || 'inactive'}
                      </span>
                    </td>
                    <td className="py-3">{user.charity_percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-gray-400 text-center py-8">No users yet!</p>
            )}
          </div>
        </div>

        {/* Scores Table */}
        <div className="bg-white p-6 rounded-2xl border">
          <h2 className="text-xl font-bold text-gray-800 mb-4">All Scores</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-500">User ID</th>
                  <th className="text-left py-3 text-gray-500">Score</th>
                  <th className="text-left py-3 text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-gray-500 text-xs">{score.user_id?.slice(0,8)}...</td>
                    <td className="py-3 font-bold text-green-700">{score.score}</td>
                    <td className="py-3">{score.score_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {scores.length === 0 && (
              <p className="text-gray-400 text-center py-8">No scores yet!</p>
            )}
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
// http://localhost:3000/admin