// @ts-nocheck
'use client'
// @ts-nocheck
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const AGE_GROUPS = [
  { key: 'seats_6_9',   label: 'Ages 6–9',   color: '#009CDE', bg: '#EBF8FF' },
  { key: 'seats_10_12', label: 'Ages 10–12', color: '#5B7A00', bg: '#F5F9E8' },
  { key: 'seats_12_14', label: 'Ages 12–14', color: '#A50050', bg: '#FDF0F6' },
]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function exportCSV(registrations: any[]) {
  const rows = [
    ['Date', 'Parent Name', 'Email', 'Phone', 'Area', 'Seats 6-9', 'Seats 10-12', 'Seats 12-14', 'Total Seats', 'Children'].join(','),
    ...registrations.map((r) => [
      formatDate(r.created_at),
      `"${r.parent_full_name}"`,
      r.parent_email,
      r.parent_phone,
      `"${r.area_of_residence || ''}"`,
      r.seats_6_9,
      r.seats_10_12,
      r.seats_12_14,
      r.seats_6_9 + r.seats_10_12 + r.seats_12_14,
      `"${(r.children || []).map((c: any) => `${c.full_name} (${c.ageKey})`).join('; ')}"`,
    ].join(',')),
  ]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a'); a.href = url; a.download = 'registrations.csv'; a.click()
  URL.revokeObjectURL(url)
}

export default function DashboardClient({ registrations, error }: { registrations: any[]; error?: string }) {
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState<string | null>(null)
  const router = useRouter()

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return registrations
    return registrations.filter((r) =>
      r.parent_full_name?.toLowerCase().includes(q) ||
      r.parent_email?.toLowerCase().includes(q) ||
      r.parent_phone?.includes(q) ||
      r.area_of_residence?.toLowerCase().includes(q) ||
      (r.children || []).some((c: any) => c.full_name?.toLowerCase().includes(q))
    )
  }, [registrations, search])

  const stats = useMemo(() => ({
    total: registrations.length,
    seats_6_9:   registrations.reduce((s, r) => s + (r.seats_6_9 || 0), 0),
    seats_10_12: registrations.reduce((s, r) => s + (r.seats_10_12 || 0), 0),
    seats_12_14: registrations.reduce((s, r) => s + (r.seats_12_14 || 0), 0),
    totalSeats:  registrations.reduce((s, r) => s + (r.seats_6_9 || 0) + (r.seats_10_12 || 0) + (r.seats_12_14 || 0), 0),
  }), [registrations])

  const handleLogout = async () => {
    await fetch('/api/dashboard', { method: 'DELETE' })
    router.push('/login')
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFF', fontFamily: "'Exo 2', 'DM Sans', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40" style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/logiscool-logo.svg" alt="Logiscool" width={130} height={30} />
            <div className="h-6 w-px bg-slate-200" />
            <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Registrations</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => exportCSV(filtered)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 transition-all bg-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-red-500 transition-all">
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
            className="col-span-2 md:col-span-1 bg-white rounded-2xl p-5 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Registrations</p>
            <p className="text-4xl font-black" style={{ color: '#0B1F3A', fontFamily: "'Exo 2', sans-serif" }}>{stats.total}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="col-span-2 md:col-span-1 bg-white rounded-2xl p-5 border border-slate-100" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <p className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">Total Seats</p>
            <p className="text-4xl font-black" style={{ color: '#0B1F3A', fontFamily: "'Exo 2', sans-serif" }}>{stats.totalSeats}</p>
          </motion.div>
          {AGE_GROUPS.map((g, i) => (
            <motion.div key={g.key} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * (i + 2) }}
              className="bg-white rounded-2xl p-5 border" style={{ borderColor: g.color + '30', background: g.bg, boxShadow: '0 2px 12px ' + g.color + '10' }}>
              <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: g.color }}>{g.label}</p>
              <p className="text-4xl font-black" style={{ color: g.color, fontFamily: "'Exo 2', sans-serif" }}>{stats[g.key]}</p>
              <p className="text-xs text-slate-400 mt-0.5">seats booked</p>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="mb-5 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              type="text" placeholder="Search by name, email, phone…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-all"
            />
          </div>
          <span className="text-sm text-slate-400 font-medium">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>}

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}>
          {/* Table header */}
          <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-100 bg-slate-50">
            <div className="col-span-3 text-xs font-bold tracking-widest uppercase text-slate-400">Parent</div>
            <div className="col-span-2 text-xs font-bold tracking-widest uppercase text-slate-400">Contact</div>
            <div className="col-span-1 text-xs font-bold tracking-widest uppercase text-slate-400 text-center">6–9</div>
            <div className="col-span-1 text-xs font-bold tracking-widest uppercase text-slate-400 text-center">10–12</div>
            <div className="col-span-1 text-xs font-bold tracking-widest uppercase text-slate-400 text-center">12–14</div>
            <div className="col-span-1 text-xs font-bold tracking-widest uppercase text-slate-400 text-center">Total</div>
            <div className="col-span-2 text-xs font-bold tracking-widest uppercase text-slate-400">Date</div>
            <div className="col-span-1 text-xs font-bold tracking-widest uppercase text-slate-400"></div>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-semibold">{search ? 'No results found' : 'No registrations yet'}</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {filtered.map((r, idx) => {
                const total = (r.seats_6_9 || 0) + (r.seats_10_12 || 0) + (r.seats_12_14 || 0)
                const isOpen = expanded === r.id
                return (
                  <div key={r.id}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="grid grid-cols-12 px-5 py-4 items-center hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setExpanded(isOpen ? null : r.id)}
                    >
                      <div className="col-span-3 pr-3">
                        <p className="font-bold text-slate-800 text-sm truncate">{r.parent_full_name}</p>
                        {r.area_of_residence && <p className="text-xs text-slate-400 truncate">{r.area_of_residence}</p>}
                      </div>
                      <div className="col-span-2 pr-3">
                        <p className="text-xs text-slate-600 truncate">{r.parent_email}</p>
                        <p className="text-xs text-slate-400">{r.parent_phone}</p>
                      </div>
                      <div className="col-span-1 text-center">
                        {r.seats_6_9 > 0
                          ? <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: '#EBF8FF', color: '#009CDE' }}>{r.seats_6_9}</span>
                          : <span className="text-slate-200">—</span>}
                      </div>
                      <div className="col-span-1 text-center">
                        {r.seats_10_12 > 0
                          ? <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: '#F5F9E8', color: '#5B7A00' }}>{r.seats_10_12}</span>
                          : <span className="text-slate-200">—</span>}
                      </div>
                      <div className="col-span-1 text-center">
                        {r.seats_12_14 > 0
                          ? <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-bold" style={{ background: '#FDF0F6', color: '#A50050' }}>{r.seats_12_14}</span>
                          : <span className="text-slate-200">—</span>}
                      </div>
                      <div className="col-span-1 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-600">{total}</span>
                      </div>
                      <div className="col-span-2 text-xs text-slate-400">{formatDate(r.created_at)}</div>
                      <div className="col-span-1 flex justify-end">
                        <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }} className="text-slate-300">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Expanded children details */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                          <div className="px-5 pb-5 pt-2 bg-slate-50 border-t border-slate-100">
                            <p className="text-xs font-black tracking-widest uppercase text-slate-400 mb-3">Children Registered</p>
                            {(!r.children || r.children.length === 0) ? (
                              <p className="text-sm text-slate-400">No child details provided.</p>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {r.children.map((child: any, ci: number) => {
                                  const ag = AGE_GROUPS.find((g) => g.key === 'seats_' + child.ageKey.replace('-','_')) ||
                                             { color: '#009CDE', bg: '#EBF8FF', label: 'Ages ' + child.ageKey.replace('_','–') }
                                  return (
                                    <div key={ci} className="rounded-xl p-4 border" style={{ background: ag.bg, borderColor: ag.color + '30' }}>
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-black tracking-wider uppercase" style={{ color: ag.color }}>
                                          Ages {child.ageKey.replace('_','–')}
                                        </span>
                                        <span className="text-xs text-slate-400">Child {ci + 1}</span>
                                      </div>
                                      <p className="font-bold text-slate-800 text-sm">{child.full_name || '—'}</p>
                                      <p className="text-xs text-slate-500 mt-0.5">{child.dob ? new Date(child.dob).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }) : '—'}</p>
                                      {(child.grade || child.school) && (
                                        <p className="text-xs text-slate-400 mt-1">{[child.grade, child.school].filter(Boolean).join(' · ')}</p>
                                      )}
                                    </div>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
