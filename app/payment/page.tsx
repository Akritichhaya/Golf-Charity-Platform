'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Payment() {
  const [plan, setPlan] = useState('monthly')
  const [loading, setLoading] = useState(false)
  const [paid, setPaid] = useState(false)
  const router = useRouter()

  const handlePayment = async () => {
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setPaid(true)
    setLoading(false)
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  if (paid) return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <p className="text-6xl mb-4">🎉</p>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
        <p className="text-gray-500">Redirecting to dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 mb-2 text-center">GolfGives</h1>
        <p className="text-gray-500 text-center mb-8">Complete your subscription</p>

        <div className="flex gap-4 mb-6">
          <button onClick={() => setPlan('monthly')}
            className={`flex-1 py-3 rounded-lg border font-semibold transition ${plan === 'monthly' ? 'bg-green-700 text-white' : 'text-gray-600'}`}>
            Monthly $9.99
          </button>
          <button onClick={() => setPlan('yearly')}
            className={`flex-1 py-3 rounded-lg border font-semibold transition ${plan === 'yearly' ? 'bg-green-700 text-white' : 'text-gray-600'}`}>
            Yearly $99
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-bold mb-3">Card Details</h3>
          <input type="text" placeholder="Card number" maxLength={16}
            className="w-full px-4 py-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <div className="flex gap-3">
            <input type="text" placeholder="MM/YY"
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
            <input type="text" placeholder="CVV" maxLength={3}
              className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"/>
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Plan</span>
            <span className="font-semibold capitalize">{plan}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Amount</span>
            <span className="font-bold text-green-700">{plan === 'monthly' ? '$9.99' : '$99.00'}</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Charity (10%)</span>
            <span className="font-semibold text-green-600">{plan === 'monthly' ? '$1.00' : '$9.90'}</span>
          </div>
        </div>

        <button onClick={handlePayment} disabled={loading}
          className="w-full px-4 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 font-semibold disabled:opacity-50">
          {loading ? 'Processing payment...' : `Pay ${plan === 'monthly' ? '$9.99' : '$99.00'}`}
        </button>

        <p className="text-center text-gray-400 text-xs mt-4">🔒 Secured payment</p>
      </div>
    </div>
  )
}
// ```

// Press **Ctrl + S** to save!

// ---

// ## Check in browser 👇
// ```
// http://localhost:3000/payment