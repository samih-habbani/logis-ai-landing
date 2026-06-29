import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const MAX_SEATS = 7

export async function GET() {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('ai_program_registrations')
    .select('seats_6_9, seats_10_12, seats_12_14')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const totals = (data ?? []).reduce(
    (acc, r) => ({
      seats_6_9:   acc.seats_6_9   + (r.seats_6_9   || 0),
      seats_10_12: acc.seats_10_12 + (r.seats_10_12 || 0),
      seats_12_14: acc.seats_12_14 + (r.seats_12_14 || 0),
    }),
    { seats_6_9: 0, seats_10_12: 0, seats_12_14: 0 }
  )

  return NextResponse.json({
    seats_6_9:   { taken: totals.seats_6_9,   max: MAX_SEATS, fullyBooked: totals.seats_6_9   >= MAX_SEATS },
    seats_10_12: { taken: totals.seats_10_12, max: MAX_SEATS, fullyBooked: totals.seats_10_12 >= MAX_SEATS },
    seats_12_14: { taken: totals.seats_12_14, max: MAX_SEATS, fullyBooked: totals.seats_12_14 >= MAX_SEATS },
  })
}
