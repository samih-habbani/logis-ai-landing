// @ts-nocheck
import { createClient } from '@supabase/supabase-js'
import DashboardClient from './DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // Use service role key to bypass RLS for server-side dashboard reads
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: registrations, error } = await supabase
    .from('ai_program_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  return <DashboardClient registrations={registrations ?? []} error={error?.message} />
}
