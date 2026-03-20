'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [plan, setPlan] = useState('monthly')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        full_name: name,
        subscription_plan: plan,
        subscription_status: 'active',
        charity_percentage: 10,
      })
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">GolfGives</h1>
        <p className="text-gray-500 text-center mb-8">Create your account and start playing!</p>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <div className="flex gap-4">
            <button type="button" onClick={() => setPlan('monthly')}
              className={`flex-1 py-3 rounded-lg border font-semibold transition ${plan === 'monthly' ? 'bg-green-700 text-white' : 'text-gray-600'}`}>
              Monthly $9.99
            </button>
            <button type="button" onClick={() => setPlan('yearly')}
              className={`flex-1 py-3 rounded-lg border font-semibold transition ${plan === 'yearly' ? 'bg-green-700 text-white' : 'text-gray-600'}`}>
              Yearly $99
            </button>
          </div>
          <button type="submit" disabled={loading}
            className="px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold disabled:opacity-50">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-green-700 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}