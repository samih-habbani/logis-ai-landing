import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { parent_full_name, parent_email, parent_phone, area_of_residence, children = [], seats_6_9 = 0, seats_10_12 = 0, seats_12_14 = 0 } = body

    if (!parent_full_name || !parent_email || !parent_phone) {
      return NextResponse.json({ error: 'Missing required parent fields' }, { status: 400 })
    }
    if (seats_6_9 + seats_10_12 + seats_12_14 === 0) {
      return NextResponse.json({ error: 'Please select at least one seat' }, { status: 400 })
    }

    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.from('ai_program_registrations').insert({
      parent_full_name, parent_email, parent_phone,
      area_of_residence: area_of_residence || null,
      children,
      seats_6_9, seats_10_12, seats_12_14,
    })

    if (error) { console.error('Supabase error:', error); return NextResponse.json({ error: error.message }, { status: 500 }) }

    const { data: allRows } = await supabase
      .from('ai_program_registrations')
      .select('seats_6_9, seats_10_12, seats_12_14')

    const totals = (allRows ?? []).reduce(
      (acc, r) => ({
        seats_6_9:   acc.seats_6_9   + (r.seats_6_9   || 0),
        seats_10_12: acc.seats_10_12 + (r.seats_10_12 || 0),
        seats_12_14: acc.seats_12_14 + (r.seats_12_14 || 0),
      }),
      { seats_6_9: 0, seats_10_12: 0, seats_12_14: 0 }
    )

    const CAPACITY = 7
    const overCapacity = [
      seats_6_9   > 0 && totals.seats_6_9   > CAPACITY && '6_9',
      seats_10_12 > 0 && totals.seats_10_12 > CAPACITY && '10_12',
      seats_12_14 > 0 && totals.seats_12_14 > CAPACITY && '12_14',
    ].filter(Boolean)

    return NextResponse.json({ success: true, overCapacity }, { status: 201 })
  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
