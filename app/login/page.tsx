'use client'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const next = params.get('next') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/dashboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push(next)
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F8FAFF' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="w-full max-w-sm bg-white rounded-3xl border border-slate-100 p-10"
        style={{ boxShadow: '0 8px 60px rgba(0,156,222,0.10)' }}>
        <div className="flex justify-center mb-8">
          <Image src="/logiscool-logo.svg" alt="Logiscool" width={160} height={36} />
        </div>
        <h1 className="text-2xl font-black text-slate-800 text-center mb-1" style={{ fontFamily: "'Exo 2', sans-serif" }}>Dashboard</h1>
        <p className="text-sm text-slate-400 text-center mb-8">Enter password to access registrations</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 transition-all"
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-black text-sm tracking-wider uppercase text-white transition-all"
            style={{ background: 'linear-gradient(135deg,#009CDE,#0076B3)', boxShadow: '0 4px 20px rgba(0,156,222,0.3)' }}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </motion.button>
        </form>
      </motion.div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@800;900&display=swap');`}</style>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
