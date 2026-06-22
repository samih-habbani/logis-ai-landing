'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const AGES = [
  {
    range: '6–9',
    title: 'Create with AI',
    subtitle: 'Images, Characters & Stories',
    color: '#00D4FF',
    icon: '🎨',
    description:
      'A playful introduction to generative AI where younger students learn how words can guide AI tools to create pictures, characters, and story ideas.',
    explore: [
      'Writing simple prompts to generate images and ideas',
      'Creating characters, scenes, and short story concepts',
      'Choosing the best AI results and improving them',
      'Combining images, titles, and descriptions into mini concepts',
      'Understanding that AI is a helper — humans make the creative decisions',
    ],
    outcome:
      'Students leave with an early understanding of how generative AI works, how prompts affect results, and how to use AI safely and creatively.',
  },
  {
    range: '10–12',
    title: 'Prompt, Design & Build',
    subtitle: 'A Multimedia Concept',
    color: '#C4D600',
    icon: '🎬',
    description:
      'Students get a deeper introduction to how generative AI can support creative projects across text, images, and sound — learning to guide AI more clearly and combine different media.',
    explore: [
      'Prompt writing for better text and image results',
      'Generating story ideas, visuals, titles, and sound concepts',
      'Comparing weak and strong prompts to improve AI output',
      'Refining AI-generated content instead of accepting the first result',
      'Basic reliability checks and responsible AI use',
    ],
    outcome:
      'Students gain practical experience in prompting, creative decision-making, and responsible AI use while producing a polished multimedia concept.',
  },
  {
    range: '12–14',
    title: 'Advanced Prompting',
    subtitle: 'AI-Powered Creative Production',
    color: '#A50050',
    icon: '🚀',
    description:
      'A structured approach to generative AI focusing on prompt strategy, creative direction, output evaluation, and responsible digital production.',
    explore: [
      'Advanced prompting techniques for clearer, more accurate outputs',
      'Generating and refining text, visuals, voices, and scene concepts',
      'Building a consistent creative direction across multiple AI outputs',
      'Evaluating AI results for quality, bias, accuracy, and reliability',
      'Ethical use of AI, misinformation, originality, and digital responsibility',
    ],
    outcome:
      'Students leave with stronger AI literacy, practical prompt engineering skills, and a clear understanding of how to use generative AI critically, creatively, and responsibly.',
  },
]

const SEAT_GROUPS = [
  { key: 'seats_6_9' as const, range: '6–9', color: '#00D4FF', icon: '🎨', title: 'Create with AI' },
  { key: 'seats_10_12' as const, range: '10–12', color: '#C4D600', icon: '🎬', title: 'Prompt, Design & Build' },
  { key: 'seats_12_14' as const, range: '12–14', color: '#A50050', icon: '🚀', title: 'Advanced Prompting' },
]

function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, width: 2, height: 2, background: '#00D4FF' }}
      animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [0, -30, -60] }}
      transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

function CircuitLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={`absolute opacity-10 pointer-events-none ${className}`} fill="none">
      <path d="M10 100 H60 V40 H140 V100 H190" stroke="#00D4FF" strokeWidth="1.5" />
      <circle cx="60" cy="100" r="4" fill="#00D4FF" />
      <circle cx="140" cy="100" r="4" fill="#00D4FF" />
      <circle cx="60" cy="40" r="3" fill="#C4D600" />
      <circle cx="140" cy="40" r="3" fill="#C4D600" />
      <path d="M100 100 V160" stroke="#00D4FF" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="100" cy="160" r="3" fill="#00D4FF" />
    </svg>
  )
}

function AgeCard({ age, index }: { age: (typeof AGES)[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${age.color}22` }}
      onClick={() => setOpen(!open)}
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${age.color}, transparent)` }} />
      <div className="p-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-xs font-black tracking-[0.25em] uppercase mb-2 block" style={{ color: age.color }}>AGES {age.range}</span>
            <h3 className="text-2xl font-black text-white leading-tight">{age.title}</h3>
            <p className="text-sm font-semibold mt-0.5" style={{ color: age.color }}>{age.subtitle}</p>
          </div>
          <motion.div className="text-4xl ml-4 flex-shrink-0" animate={{ rotate: open ? 15 : 0 }} transition={{ duration: 0.3 }}>
            {age.icon}
          </motion.div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">{age.description}</p>
        <motion.button className="mt-5 text-xs font-bold tracking-widest uppercase flex items-center gap-2" style={{ color: age.color }} whileTap={{ scale: 0.97 }}>
          {open ? 'Hide Details' : 'Explore Program'}
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.3 }}>→</motion.span>
        </motion.button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 border-t" style={{ borderColor: `${age.color}22` }}>
              <p className="text-xs font-black tracking-[0.2em] uppercase mt-6 mb-3" style={{ color: age.color }}>What They Explore</p>
              <ul className="space-y-2">
                {age.explore.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex items-start gap-2 text-sm text-slate-300">
                    <span style={{ color: age.color }} className="mt-0.5 flex-shrink-0">◆</span>
                    {item}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-5 p-4 rounded-xl text-sm text-slate-300 leading-relaxed" style={{ background: `${age.color}10`, border: `1px solid ${age.color}22` }}>
                <span className="font-bold" style={{ color: age.color }}>Learning Outcome: </span>
                {age.outcome}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SeatCounter({ group, value, onChange }: { group: (typeof SEAT_GROUPS)[0]; value: number; onChange: (n: number) => void }) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="relative rounded-2xl p-5 flex flex-col gap-4"
      style={{
        background: value > 0 ? `${group.color}12` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${value > 0 ? group.color + '50' : 'rgba(255,255,255,0.08)'}`,
        transition: 'background 0.3s, border-color 0.3s',
      }}
    >
      {value > 0 && (
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }} />
      )}
      <div className="flex items-center gap-3">
        <span className="text-2xl">{group.icon}</span>
        <div>
          <span className="text-xs font-black tracking-[0.2em] uppercase block" style={{ color: group.color }}>Ages {group.range}</span>
          <span className="text-sm font-bold text-white">{group.title}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">{value === 0 ? 'No seats selected' : `${value} seat${value > 1 ? 's' : ''}`}</span>
        <div className="flex items-center gap-2">
          <motion.button type="button" whileTap={{ scale: 0.85 }} onClick={() => onChange(Math.max(0, value - 1))} disabled={value === 0}
            className="w-8 h-8 rounded-lg font-black text-base flex items-center justify-center transition-all disabled:opacity-30"
            style={{ background: value > 0 ? `${group.color}20` : 'rgba(255,255,255,0.05)', color: value > 0 ? group.color : '#64748b', border: `1px solid ${value > 0 ? group.color + '40' : 'rgba(255,255,255,0.08)'}` }}>
            −
          </motion.button>
          <motion.span key={value} initial={{ scale: 1.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-8 text-center text-lg font-black" style={{ color: value > 0 ? group.color : '#475569' }}>
            {value}
          </motion.span>
          <motion.button type="button" whileTap={{ scale: 0.85 }} onClick={() => onChange(Math.min(10, value + 1))}
            className="w-8 h-8 rounded-lg font-black text-base flex items-center justify-center transition-all"
            style={{ background: `${group.color}20`, color: group.color, border: `1px solid ${group.color}40` }}>
            +
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function RegistrationForm() {
  const [form, setForm] = useState({ parent_full_name: '', parent_email: '', parent_phone: '', area_of_residence: '', child_full_name: '', child_dob: '', child_grade: '', child_school: '' })
  const [seats, setSeats] = useState({ seats_6_9: 0, seats_10_12: 0, seats_12_14: 0 })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const totalSeats = seats.seats_6_9 + seats.seats_10_12 + seats.seats_12_14

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (totalSeats === 0) { setError('Please select at least one seat for a workshop.'); return }
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/registrations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, ...seats }) })
      if (!res.ok) { const data = await res.json(); throw new Error(data.error || 'Registration failed') }
      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 transition-all duration-200'
  const labelClass = 'block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1.5'

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden p-8 md:p-12"
      style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.15)', boxShadow: '0 0 80px rgba(0,212,255,0.05)' }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #C4D600, transparent)' }} />

      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="text-7xl mb-6">🎉</motion.div>
          <h3 className="text-3xl font-black text-white mb-3">You&apos;re registered!</h3>
          <p className="text-slate-400 max-w-sm mx-auto mb-4">
            We&apos;ve booked <span className="text-cyan-400 font-bold">{totalSeats} seat{totalSeats > 1 ? 's' : ''}</span>:{' '}
            {[seats.seats_6_9 > 0 && `${seats.seats_6_9} × Ages 6–9`, seats.seats_10_12 > 0 && `${seats.seats_10_12} × Ages 10–12`, seats.seats_12_14 > 0 && `${seats.seats_12_14} × Ages 12–14`].filter(Boolean).join(', ')}.
          </p>
          <p className="text-slate-500 text-sm">Our team will be in touch at <span className="text-cyan-400">{form.parent_email}</span></p>
          <p className="text-slate-600 text-xs mt-3">Questions? <a href="mailto:hello.arjan@logiscool.com" className="text-cyan-400 hover:underline">hello.arjan@logiscool.com</a></p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Parent */}
          <div>
            <div className="flex items-center gap-3 mb-6"><div className="h-px flex-1 bg-white/10" /><span className="text-xs font-black tracking-[0.25em] uppercase text-cyan-400">Parent / Guardian</span><div className="h-px flex-1 bg-white/10" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Full Name <span className="text-cyan-400">*</span></label><input className={inputClass} name="parent_full_name" required placeholder="Sarah Al Mansouri" value={form.parent_full_name} onChange={handleChange} /></div>
              <div><label className={labelClass}>Email Address <span className="text-cyan-400">*</span></label><input className={inputClass} name="parent_email" type="email" required placeholder="sarah@email.com" value={form.parent_email} onChange={handleChange} /></div>
              <div><label className={labelClass}>Phone Number <span className="text-cyan-400">*</span></label><input className={inputClass} name="parent_phone" type="tel" required placeholder="+971 50 000 0000" value={form.parent_phone} onChange={handleChange} /></div>
              <div><label className={labelClass}>Area of Residence</label><input className={inputClass} name="area_of_residence" placeholder="Dubai Marina, JVC, Downtown…" value={form.area_of_residence} onChange={handleChange} /></div>
            </div>
          </div>

          {/* Seats */}
          <div>
            <div className="flex items-center gap-3 mb-2"><div className="h-px flex-1 bg-white/10" /><span className="text-xs font-black tracking-[0.25em] uppercase text-yellow-400">Workshop Seats</span><div className="h-px flex-1 bg-white/10" /></div>
            <p className="text-xs text-slate-500 text-center mb-5">Select the number of seats per age group — you can book for multiple children</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SEAT_GROUPS.map((group) => (
                <SeatCounter key={group.key} group={group} value={seats[group.key]} onChange={(n) => setSeats((s) => ({ ...s, [group.key]: n }))} />
              ))}
            </div>
            {totalSeats > 0 && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-sm font-bold text-cyan-400">
                {totalSeats} seat{totalSeats > 1 ? 's' : ''} selected
              </motion.div>
            )}
          </div>

          {/* Child */}
          <div>
            <div className="flex items-center gap-3 mb-6"><div className="h-px flex-1 bg-white/10" /><span className="text-xs font-black tracking-[0.25em] uppercase text-slate-400">Child Info <span className="normal-case font-normal text-slate-600">(primary child)</span></span><div className="h-px flex-1 bg-white/10" /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Child&apos;s Full Name <span className="text-cyan-400">*</span></label><input className={inputClass} name="child_full_name" required placeholder="Omar Al Mansouri" value={form.child_full_name} onChange={handleChange} /></div>
              <div><label className={labelClass}>Date of Birth <span className="text-cyan-400">*</span></label><input className={inputClass} name="child_dob" type="date" required value={form.child_dob} onChange={handleChange} /></div>
              <div>
                <label className={labelClass}>Child&apos;s Grade</label>
                <select className={inputClass} name="child_grade" value={form.child_grade} onChange={handleChange} style={{ appearance: 'none' }}>
                  <option value="" disabled>Select grade…</option>
                  {['KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'].map((g) => (
                    <option key={g} value={g} style={{ background: '#0d1b2e' }}>{g}</option>
                  ))}
                </select>
              </div>
              <div><label className={labelClass}>Child&apos;s School</label><input className={inputClass} name="child_school" placeholder="GEMS, DAIS, Repton…" value={form.child_school} onChange={handleChange} /></div>
            </div>
          </div>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center bg-red-400/10 rounded-xl p-3">{error}</motion.p>}

          <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: totalSeats > 0 ? 1.02 : 1 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wider uppercase transition-all disabled:opacity-50"
            style={{ background: totalSeats > 0 ? 'linear-gradient(135deg, #00D4FF, #009CDE)' : 'rgba(255,255,255,0.08)', color: totalSeats > 0 ? '#0B1426' : '#475569', boxShadow: totalSeats > 0 ? '0 0 40px rgba(0,212,255,0.3)' : 'none', transition: 'all 0.3s' }}>
            {status === 'loading' ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                Registering…
              </span>
            ) : totalSeats > 0 ? `Register ${totalSeats} Seat${totalSeats > 1 ? 's' : ''} →` : 'Select seats to continue'}
          </motion.button>

          <p className="text-center text-xs text-slate-500">By registering, you agree to be contacted by Logiscool Dubai regarding this program.</p>
        </form>
      )}
    </motion.div>
  )
}

const particles = Array.from({ length: 25 }, (_, i) => ({
  x: Math.floor((i * 17 + 5) % 100),
  y: Math.floor((i * 23 + 11) % 100),
  delay: parseFloat(((i * 0.4) % 3).toFixed(2)),
}))

export default function GenerativeAILanding() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <main className="min-h-screen" style={{ background: '#0B1426', fontFamily: "'Exo 2', 'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes pulse-glow { 0%, 100% { opacity: 0.15; } 50% { opacity: 0.4; } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100vh); } }
        .float { animation: float 6s ease-in-out infinite; }
        .float-slow { animation: float 9s ease-in-out infinite; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 pulse-glow" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 40%, rgba(0,156,222,0.15) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 60%, rgba(196,214,0,0.08) 0%, transparent 70%)' }} />
        <CircuitLine className="w-64 h-64 top-10 right-10 float-slow" />
        <CircuitLine className="w-48 h-48 bottom-20 left-5 float" />
        {mounted && particles.map((p, i) => <Particle key={i} x={p.x} y={p.y} delay={p.delay} />)}
        <div className="absolute left-0 right-0 h-px opacity-5 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, transparent)', animation: 'scan 8s linear infinite' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 flex justify-center">
            <Image src="/logiscool-logo.svg" alt="Logiscool" width={220} height={48} priority />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase"
            style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', color: '#00D4FF' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
            Dubai Customs × Logiscool
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-none mb-4"
            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)', fontFamily: "'Exo 2', sans-serif", background: 'linear-gradient(135deg, #FFFFFF 30%, #00D4FF 70%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            GENERATIVE<br />
            <span style={{ background: 'linear-gradient(135deg, #00D4FF, #C4D600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="text-xl md:text-2xl font-semibold text-slate-300 mb-3">
            Creative AI, Prompting & Multimedia Creation
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="text-slate-500 text-base mb-12">
            Adapted for ages 6–9, 10–12 and 12–14
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="#register" whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,212,255,0.4)' }} whileTap={{ scale: 0.98 }} className="px-10 py-4 rounded-2xl font-black text-sm tracking-wider uppercase transition-all" style={{ background: 'linear-gradient(135deg, #00D4FF, #009CDE)', color: '#0B1426' }}>
              Register Now
            </motion.a>
            <motion.a href="#programs" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="px-10 py-4 rounded-2xl font-bold text-sm tracking-wider uppercase border transition-all text-slate-300" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              Explore Programs
            </motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <span>📍 Cityland Mall, Dubai</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <a href="tel:+971504104520" className="hover:text-cyan-400 transition-colors">+971 50 410 4520</a>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <a href="mailto:hello.arjan@logiscool.com" className="hover:text-cyan-400 transition-colors">hello.arjan@logiscool.com</a>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2">
            <div className="w-1 h-2 rounded-full bg-cyan-400/60" />
          </div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="text-xs font-black tracking-[0.25em] uppercase text-cyan-400 mb-4 block">About The Program</span>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight" style={{ fontFamily: "'Exo 2', sans-serif" }}>
              Hands-on AI for<br /><span style={{ color: '#00D4FF' }}>Future Creators</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              A hands-on camp where children explore how generative AI can create text, images, sounds, voices, and animated content. Through guided creative challenges, students learn how AI responds to prompts, how to improve results, and how to use these tools responsibly.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="grid grid-cols-2 gap-4">
            {[{ icon: '✍️', label: 'Prompt Engineering' }, { icon: '🖼️', label: 'AI Image Creation' }, { icon: '🎵', label: 'Sound & Voice AI' }, { icon: '🛡️', label: 'Responsible AI' }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="rounded-2xl p-5 text-center" style={{ background: 'rgba(0,212,255,0.05)', border: '1px solid rgba(0,212,255,0.1)' }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-xs font-bold text-slate-400">{item.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="max-w-4xl mx-auto px-6 pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="text-xs font-black tracking-[0.25em] uppercase text-cyan-400 mb-4 block">Three Programs</span>
          <h2 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Choose Your <span style={{ color: '#C4D600' }}>Level</span>
          </h2>
        </motion.div>
        <div className="space-y-4">
          {AGES.map((age, i) => <AgeCard key={age.range} age={age} index={i} />)}
        </div>
      </section>

      {/* REGISTER */}
      <section id="register" className="max-w-3xl mx-auto px-6 pb-32">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-black tracking-[0.25em] uppercase text-cyan-400 mb-4 block">Secure Your Spot</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            Register <span style={{ color: '#00D4FF' }}>Today</span>
          </h2>
          <p className="text-slate-500">Fill in the details below and our team will be in touch shortly.</p>
        </motion.div>
        <RegistrationForm />
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/logiscool-logo.svg" alt="Logiscool" width={150} height={32} />
          <div className="text-slate-600 text-xs text-center">
            <p>Dubai, Cityland Mall</p>
            <p className="mt-1">Create. Code. Enjoy.</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs text-slate-600">
            <a href="tel:+971504104520" className="hover:text-cyan-400 transition-colors">+971 50 410 4520</a>
            <a href="mailto:hello.arjan@logiscool.com" className="hover:text-cyan-400 transition-colors">hello.arjan@logiscool.com</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
