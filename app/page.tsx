import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 border-b">
        <h1 className="text-2xl font-bold text-green-700">GolfGives</h1>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-gray-600 hover:text-green-700">Login</Link>
          <Link href="/signup" className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">Subscribe Now</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-8 bg-gradient-to-b from-green-50 to-white">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Play Golf. Win Prizes. <span className="text-green-700">Change Lives.</span></h2>
        <p className="text-xl text-gray-500 max-w-2xl mb-10">Join thousands of golfers who play, compete in monthly draws, and donate to causes they love — all in one platform.</p>
        <Link href="/signup" className="px-8 py-4 bg-green-700 text-white text-lg rounded-full hover:bg-green-800 transition">Start Your Journey →</Link>
      </section>

      {/* How It Works */}
      <section className="py-20 px-8 max-w-5xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="text-4xl mb-4">⛳</div>
            <h4 className="text-xl font-bold mb-2">Enter Your Scores</h4>
            <p className="text-gray-500">Log your last 5 golf scores in Stableford format and get entered into monthly draws.</p>
          </div>
          <div className="text-center p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="text-4xl mb-4">🎉</div>
            <h4 className="text-xl font-bold mb-2">Win Monthly Prizes</h4>
            <p className="text-gray-500">Match 3, 4, or 5 numbers to win your share of the prize pool every month.</p>
          </div>
          <div className="text-center p-6 rounded-2xl border hover:shadow-lg transition">
            <div className="text-4xl mb-4">❤️</div>
            <h4 className="text-xl font-bold mb-2">Support Charity</h4>
            <p className="text-gray-500">A portion of every subscription goes directly to the charity of your choice.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-8 bg-green-50">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">Choose Your Plan</h3>
        <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">
          <div className="flex-1 bg-white p-8 rounded-2xl border text-center hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Monthly</h4>
            <p className="text-4xl font-bold text-green-700 mb-4">$9.99<span className="text-lg text-gray-400">/mo</span></p>
            <p className="text-gray-500 mb-6">Perfect for casual golfers</p>
            <Link href="/signup" className="block px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800">Get Started</Link>
          </div>
          <div className="flex-1 bg-green-700 p-8 rounded-2xl text-center text-white hover:shadow-lg transition">
            <h4 className="text-xl font-bold mb-2">Yearly</h4>
            <p className="text-4xl font-bold mb-4">$99<span className="text-lg opacity-75">/yr</span></p>
            <p className="opacity-75 mb-6">Save 17% — Best value!</p>
            <Link href="/signup" className="block px-6 py-3 bg-white text-green-700 rounded-full hover:bg-gray-100">Get Started</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 border-t">
        <p>© 2026 GolfGives. All rights reserved.</p>
      </footer>
    </main>
  )
}