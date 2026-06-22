// @ts-nocheck
'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const CONTACT = {
  phone: '+971 58 688 7419',
  email: 'hello.uae@logiscool.com',
  location: 'Cityland Mall, Dubai',
}

const AGES = [
  {
    range: '6–9', key: '6_9',
    title: 'Create with AI', subtitle: 'Images, Characters & Stories',
    color: '#009CDE', bg: '#EBF8FF', icon: '🎨',
    description: 'A playful introduction to generative AI where younger students learn how words can guide AI tools to create pictures, characters, and story ideas.',
    explore: ['Writing simple prompts to generate images and ideas','Creating characters, scenes, and short story concepts','Choosing the best AI results and improving them','Combining images, titles, and descriptions into mini concepts','Understanding that AI is a helper — humans make the creative decisions'],
    outcome: 'Students leave with an early understanding of how generative AI works, how prompts affect results, and how to use AI safely and creatively.',
  },
  {
    range: '10–12', key: '10_12',
    title: 'Prompt, Design & Build', subtitle: 'A Multimedia Concept',
    color: '#5B7A00', bg: '#F5F9E8', icon: '🎬',
    description: 'Students get a deeper introduction to how generative AI can support creative projects across text, images, and sound — learning to guide AI more clearly.',
    explore: ['Prompt writing for better text and image results','Generating story ideas, visuals, titles, and sound concepts','Comparing weak and strong prompts to improve AI output','Refining AI-generated content instead of accepting the first result','Basic reliability checks and responsible AI use'],
    outcome: 'Students gain practical experience in prompting, creative decision-making, and responsible AI use while producing a polished multimedia concept.',
  },
  {
    range: '12–14', key: '12_14',
    title: 'Advanced Prompting', subtitle: 'AI-Powered Creative Production',
    color: '#A50050', bg: '#FDF0F6', icon: '🚀',
    description: 'A structured approach to generative AI focusing on prompt strategy, creative direction, output evaluation, and responsible digital production.',
    explore: ['Advanced prompting techniques for clearer, more accurate outputs','Generating and refining text, visuals, voices, and scene concepts','Building a consistent creative direction across multiple AI outputs','Evaluating AI results for quality, bias, accuracy, and reliability','Ethical use of AI, misinformation, originality, and digital responsibility'],
    outcome: 'Students leave with stronger AI literacy, practical prompt engineering skills, and a clear understanding of how to use generative AI critically, creatively, and responsibly.',
  },
]

const SEAT_GROUPS = [
  { key: 'seats_6_9', ageKey: '6_9', range: '6–9', color: '#009CDE', bg: '#EBF8FF', icon: '🎨', title: 'Create with AI' },
  { key: 'seats_10_12', ageKey: '10_12', range: '10–12', color: '#5B7A00', bg: '#F5F9E8', icon: '🎬', title: 'Prompt, Design & Build' },
  { key: 'seats_12_14', ageKey: '12_14', range: '12–14', color: '#A50050', bg: '#FDF0F6', icon: '🚀', title: 'Advanced Prompting' },
]

const MAX_SEATS = 7

function AgeCard({ age, index }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden cursor-pointer border" style={{ borderColor: age.color + '30', background: 'white', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
      onClick={() => setOpen(!open)} whileHover={{ y: -3, boxShadow: '0 8px 32px ' + age.color + '20' }}>
      <div className="p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: age.bg }}>{age.icon}</div>
            <div>
              <span className="text-xs font-black tracking-[0.2em] uppercase block mb-0.5" style={{ color: age.color }}>Ages {age.range}</span>
              <h3 className="text-xl font-black text-slate-800 leading-tight">{age.title}</h3>
              <p className="text-sm font-semibold" style={{ color: age.color }}>{age.subtitle}</p>
            </div>
          </div>
          <motion.div className="text-slate-400 flex-shrink-0 mt-1" animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.25 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
          </motion.div>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mt-4">{age.description}</p>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
            <div className="px-7 pb-7 border-t" style={{ borderColor: age.color + '15', background: age.bg }}>
              <p className="text-xs font-black tracking-[0.2em] uppercase mt-5 mb-3" style={{ color: age.color }}>What They Explore</p>
              <ul className="space-y-2 mb-5">
                {age.explore.map((item, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full inline-block" style={{ background: age.color }} />{item}
                  </motion.li>
                ))}
              </ul>
              <div className="rounded-xl p-4 text-sm text-slate-700 leading-relaxed border" style={{ background: 'white', borderColor: age.color + '20' }}>
                <span className="font-bold" style={{ color: age.color }}>Learning Outcome: </span>{age.outcome}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SeatCounter({ group, value, onChange }) {
  return (
    <div className="rounded-2xl p-5 border transition-all duration-300" style={{ background: value > 0 ? group.bg : 'white', borderColor: value > 0 ? group.color + '40' : '#e2e8f0', boxShadow: value > 0 ? '0 4px 20px ' + group.color + '15' : '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: value > 0 ? group.color + '15' : '#f1f5f9' }}>{group.icon}</div>
        <div>
          <span className="text-xs font-black tracking-[0.2em] uppercase block" style={{ color: group.color }}>Ages {group.range}</span>
          <span className="text-sm font-bold text-slate-700">{group.title}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400 font-medium">{value === 0 ? 'No seats' : value + ' / ' + MAX_SEATS + ' seat' + (value > 1 ? 's' : '')}</span>
        <div className="flex items-center gap-2">
          <motion.button type="button" whileTap={{ scale: 0.85 }} onClick={() => onChange(Math.max(0, value - 1))} disabled={value === 0}
            className="w-8 h-8 rounded-lg font-black text-lg flex items-center justify-center border transition-all disabled:opacity-30"
            style={{ background: 'white', borderColor: value > 0 ? group.color + '40' : '#e2e8f0', color: value > 0 ? group.color : '#94a3b8' }}>−</motion.button>
          <motion.span key={value} initial={{ scale: 1.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-8 text-center text-lg font-black" style={{ color: value > 0 ? group.color : '#cbd5e1' }}>{value}</motion.span>
          <motion.button type="button" whileTap={{ scale: 0.85 }} onClick={() => onChange(Math.min(MAX_SEATS, value + 1))} disabled={value === MAX_SEATS}
            className="w-8 h-8 rounded-lg font-black text-lg flex items-center justify-center border transition-all disabled:opacity-40"
            style={{ background: value > 0 ? group.color : '#f8fafc', borderColor: value > 0 ? group.color : '#e2e8f0', color: value > 0 ? 'white' : '#94a3b8' }}>+</motion.button>
        </div>
      </div>
      {value === MAX_SEATS && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-2 font-medium" style={{ color: group.color }}>Maximum {MAX_SEATS} seats per group</motion.p>}
    </div>
  )
}

function ChildForm({ child, index, total, onChange }) {
  const ageInfo = SEAT_GROUPS.find((g) => g.ageKey === child.ageKey)
  const inputClass = 'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 transition-all duration-200'
  const labelClass = 'block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5'
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
      className="rounded-2xl border p-6" style={{ borderColor: ageInfo.color + '25', background: ageInfo.bg }}>
      <div className="flex items-center gap-2 mb-5">
        <span className="text-lg">{ageInfo.icon}</span>
        <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: ageInfo.color }}>Ages {ageInfo.range}</span>
        <span className="text-slate-300 text-xs mx-1">·</span>
        <span className="text-xs font-bold text-slate-500">Child {index + 1}{total > 1 ? ' of ' + total : ''}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className={labelClass}>Full Name <span className="text-red-400">*</span></label><input className={inputClass} required placeholder="Omar Al Mansouri" value={child.full_name} onChange={(e) => onChange({ full_name: e.target.value })} /></div>
        <div><label className={labelClass}>Date of Birth <span className="text-red-400">*</span></label><input className={inputClass} type="date" required value={child.dob} onChange={(e) => onChange({ dob: e.target.value })} /></div>
        <div>
          <label className={labelClass}>Grade</label>
          <select className={inputClass} value={child.grade} onChange={(e) => onChange({ grade: e.target.value })} style={{ appearance: 'none' }}>
            <option value="">Select grade…</option>
            {['KG','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12'].map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div><label className={labelClass}>School</label><input className={inputClass} placeholder="GEMS, DAIS, Repton…" value={child.school} onChange={(e) => onChange({ school: e.target.value })} /></div>
      </div>
    </motion.div>
  )
}

function RegistrationForm() {
  const [parent, setParent] = useState({ full_name: '', email: '', phone: '', area: '' })
  const [seats, setSeats] = useState({ seats_6_9: 0, seats_10_12: 0, seats_12_14: 0 })
  const [children, setChildren] = useState([])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const totalSeats = seats.seats_6_9 + seats.seats_10_12 + seats.seats_12_14

  useEffect(() => {
    const map = { '6_9': seats.seats_6_9, '10_12': seats.seats_10_12, '12_14': seats.seats_12_14 }
    const next = []
    for (const ageKey of ['6_9', '10_12', '12_14']) {
      const existing = children.filter((c) => c.ageKey === ageKey)
      for (let i = 0; i < map[ageKey]; i++) {
        next.push(existing[i] ?? { ageKey, full_name: '', dob: '', grade: '', school: '' })
      }
    }
    setChildren(next)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seats])

  const updateChild = (index, patch) => setChildren((prev) => prev.map((c, i) => i === index ? { ...c, ...patch } : c))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (totalSeats === 0) { setError('Please select at least one seat.'); return }
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/registrations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ parent_full_name: parent.full_name, parent_email: parent.email, parent_phone: parent.phone, area_of_residence: parent.area, children, ...seats }) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Registration failed') }
      setStatus('success')
    } catch (err) { setStatus('error'); setError(err.message || 'Something went wrong.') }
  }

  const inputClass = 'w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-400 focus:bg-white transition-all duration-200'
  const labelClass = 'block text-xs font-bold tracking-widest uppercase text-slate-500 mb-1.5'
  const divider = (label) => (
    <div className="flex items-center gap-3 mb-6"><div className="h-px flex-1 bg-slate-100" /><span className="text-xs font-black tracking-[0.25em] uppercase text-slate-400">{label}</span><div className="h-px flex-1 bg-slate-100" /></div>
  )

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-3xl border border-slate-100 p-8 md:p-12" style={{ boxShadow: '0 8px 60px rgba(0,156,222,0.08)' }}>

      {status === 'success' ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
          <motion.div animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }} className="text-7xl mb-6">🎉</motion.div>
          <h3 className="text-3xl font-black text-slate-800 mb-3">You&apos;re registered!</h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-2">
            We&apos;ve booked <span className="font-bold text-blue-500">{totalSeats} seat{totalSeats > 1 ? 's' : ''}</span>:{' '}
            {[seats.seats_6_9 > 0 && seats.seats_6_9 + ' × Ages 6–9', seats.seats_10_12 > 0 && seats.seats_10_12 + ' × Ages 10–12', seats.seats_12_14 > 0 && seats.seats_12_14 + ' × Ages 12–14'].filter(Boolean).join(', ')}.
          </p>
          <p className="text-slate-400 text-sm">Our team will be in touch at <span className="text-blue-500">{parent.email}</span></p>
          <p className="text-slate-400 text-xs mt-3">Questions? <a href={'mailto:' + CONTACT.email} className="text-blue-500 hover:underline">{CONTACT.email}</a></p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            {divider('Parent / Guardian')}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Full Name <span className="text-red-400">*</span></label><input className={inputClass} required placeholder="Sarah Al Mansouri" value={parent.full_name} onChange={(e) => setParent({ ...parent, full_name: e.target.value })} /></div>
              <div><label className={labelClass}>Email Address <span className="text-red-400">*</span></label><input className={inputClass} type="email" required placeholder="sarah@email.com" value={parent.email} onChange={(e) => setParent({ ...parent, email: e.target.value })} /></div>
              <div><label className={labelClass}>Phone Number <span className="text-red-400">*</span></label><input className={inputClass} type="tel" required placeholder="+971 50 000 0000" value={parent.phone} onChange={(e) => setParent({ ...parent, phone: e.target.value })} /></div>
              <div><label className={labelClass}>Area of Residence</label><input className={inputClass} placeholder="Dubai Marina, JVC, Downtown…" value={parent.area} onChange={(e) => setParent({ ...parent, area: e.target.value })} /></div>
            </div>
          </div>

          <div>
            {divider('Workshop Seats')}
            <p className="text-xs text-slate-400 text-center mb-5">Select the number of seats per age group (max {MAX_SEATS} each) — you can book for multiple children</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {SEAT_GROUPS.map((group) => <SeatCounter key={group.key} group={group} value={seats[group.key]} onChange={(n) => setSeats((s) => ({ ...s, [group.key]: n }))} />)}
            </div>
            {totalSeats > 0 && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center text-sm font-bold text-blue-500">{totalSeats} seat{totalSeats > 1 ? 's' : ''} selected</motion.div>}
          </div>

          <AnimatePresence>
            {totalSeats > 0 && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                {divider('Children Details (' + totalSeats + ' ' + (totalSeats > 1 ? 'children' : 'child') + ')')}
                <div className="space-y-4">
                  <AnimatePresence>
                    {children.map((child, i) => <ChildForm key={child.ageKey + '-' + i} child={child} index={i} total={totalSeats} onChange={(patch) => updateChild(i, patch)} />)}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm text-center bg-red-50 rounded-xl p-3 border border-red-100">{error}</motion.p>}

          <motion.button type="submit" disabled={status === 'loading'} whileHover={{ scale: totalSeats > 0 ? 1.02 : 1 }} whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wider uppercase transition-all disabled:opacity-50"
            style={{ background: totalSeats > 0 ? 'linear-gradient(135deg, #009CDE, #0076B3)' : '#f1f5f9', color: totalSeats > 0 ? 'white' : '#94a3b8', boxShadow: totalSeats > 0 ? '0 8px 30px rgba(0,156,222,0.3)' : 'none', transition: 'all 0.3s' }}>
            {status === 'loading'
              ? <span className="flex items-center justify-center gap-2"><motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />Registering…</span>
              : totalSeats > 0 ? 'Register ' + totalSeats + ' Seat' + (totalSeats > 1 ? 's' : '') + ' →' : 'Select seats to continue'}
          </motion.button>
          <p className="text-center text-xs text-slate-400">By registering, you agree to be contacted by Logiscool Dubai regarding this program.</p>
        </form>
      )}
    </motion.div>
  )
}

export default function GenerativeAILanding() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <main style={{ background: '#F8FAFF', fontFamily: "'Exo 2', 'DM Sans', system-ui, sans-serif", color: '#1e293b' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .float { animation: float 7s ease-in-out infinite; }
        .float-slow { animation: float 10s ease-in-out infinite 1s; }
      `}</style>

      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(160deg,#0B1F3A 0%,#0D3561 50%,#0B5394 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: '#009CDE', filter: 'blur(80px)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: '#C4D600', filter: 'blur(60px)', transform: 'translate(-30%,30%)' }} />
        {mounted && [...Array(6)].map((_, i) => <div key={i} className="absolute rounded-full float" style={{ width: 6, height: 6, background: '#009CDE', opacity: 0.3 + i * 0.07, left: (10 + i * 15) + '%', top: (20 + (i % 3) * 20) + '%', animationDelay: i * 0.8 + 's' }} />)}
        <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg,#009CDE,#C4D600,#A50050,#009CDE)' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mb-10 flex justify-center">
            <Image src="/logiscool-logo.svg" alt="Logiscool" width={200} height={44} priority />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-bold tracking-widest uppercase"
            style={{ background: 'rgba(0,156,222,0.2)', border: '1px solid rgba(0,156,222,0.4)', color: '#7DD8F8' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#7DD8F8' }} />
            Dubai Customs × Logiscool
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-none mb-5"
            style={{ fontSize: 'clamp(3rem,9vw,7.5rem)', fontFamily: "'Exo 2',sans-serif", color: 'white' }}>
            GENERATIVE<br />
            <span style={{ background: 'linear-gradient(135deg,#009CDE,#C4D600)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>AI</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="text-xl md:text-2xl font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Creative AI, Prompting & Multimedia Creation
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }} className="text-base mb-12" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Adapted for ages 6–9, 10–12 and 12–14
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.7 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="#register" whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,156,222,0.5)' }} whileTap={{ scale: 0.97 }} className="px-9 py-4 rounded-2xl font-black text-sm tracking-wider uppercase" style={{ background: 'linear-gradient(135deg,#009CDE,#0076B3)', color: 'white', boxShadow: '0 4px 24px rgba(0,156,222,0.35)' }}>Register Now</motion.a>
            <motion.a href="#programs" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="px-9 py-4 rounded-2xl font-bold text-sm tracking-wider uppercase border" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.05)' }}>Explore Programs</motion.a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-14 flex flex-wrap items-center justify-center gap-4 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <span>📍 {CONTACT.location}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href={'tel:' + CONTACT.phone.replace(/\s/g,'')} className="hover:text-white transition-colors">{CONTACT.phone}</a>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <a href={'mailto:' + CONTACT.email} className="hover:text-white transition-colors">{CONTACT.email}</a>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center pt-2" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
            <div className="w-1 h-2 rounded-full" style={{ background: 'rgba(0,156,222,0.7)' }} />
          </div>
        </motion.div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-500 mb-4 block">About The Program</span>
            <h2 className="text-4xl font-black text-slate-800 mb-5 leading-tight" style={{ fontFamily: "'Exo 2',sans-serif" }}>Hands-on AI for<br /><span style={{ color: '#009CDE' }}>Future Creators</span></h2>
            <p className="text-slate-500 leading-relaxed">A hands-on camp where children explore how generative AI can create text, images, sounds, voices, and animated content. Through guided creative challenges, students learn how AI responds to prompts, how to improve results, and how to use these tools responsibly.</p>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            {[{ icon: '✍️', label: 'Prompt Engineering', color: '#009CDE', bg: '#EBF8FF' },{ icon: '🖼️', label: 'AI Image Creation', color: '#5B7A00', bg: '#F5F9E8' },{ icon: '🎵', label: 'Sound & Voice AI', color: '#A50050', bg: '#FDF0F6' },{ icon: '🛡️', label: 'Responsible AI', color: '#009CDE', bg: '#EBF8FF' }].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="rounded-2xl p-5 text-center border" style={{ background: item.bg, borderColor: item.color + '20' }}>
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-xs font-bold" style={{ color: item.color }}>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="programs" className="py-24" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-500 mb-4 block">Three Programs</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800" style={{ fontFamily: "'Exo 2',sans-serif" }}>Choose Your <span style={{ color: '#5B7A00' }}>Level</span></h2>
          </motion.div>
          <div className="space-y-4">{AGES.map((age, i) => <AgeCard key={age.range} age={age} index={i} />)}</div>
        </div>
      </section>

      <section id="register" className="py-24 px-6" style={{ background: '#F8FAFF' }}>
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="text-xs font-black tracking-[0.25em] uppercase text-blue-500 mb-4 block">Secure Your Spot</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-3" style={{ fontFamily: "'Exo 2',sans-serif" }}>Register <span style={{ color: '#009CDE' }}>Today</span></h2>
            <p className="text-slate-400">Fill in the details below and our team will be in touch shortly.</p>
          </motion.div>
          <RegistrationForm />
        </div>
      </section>

      <footer className="py-12" style={{ background: '#0B1F3A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <Image src="/logiscool-logo.svg" alt="Logiscool" width={150} height={32} />
          <div className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <p>Dubai, Cityland Mall</p><p className="mt-1">Create. Code. Enjoy.</p>
          </div>
          <div className="flex flex-col items-end gap-1 text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            <a href={'tel:' + CONTACT.phone.replace(/\s/g,'')} className="hover:text-white transition-colors">{CONTACT.phone}</a>
            <a href={'mailto:' + CONTACT.email} className="hover:text-white transition-colors">{CONTACT.email}</a>
          </div>
        </div>
        <div className="mt-8 h-0.5 max-w-4xl mx-auto" style={{ background: 'linear-gradient(90deg,transparent,#009CDE40,#C4D60040,transparent)' }} />
      </footer>
    </main>
  )
}
