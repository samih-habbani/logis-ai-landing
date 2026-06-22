// @ts-nocheck
import { createSupabaseServerClient } from '@/lib/supabase'
import DashboardClient from './DashboardClient'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()
  const { data: registrations, error } = await supabase
    .from('ai_program_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  return <DashboardClient registrations={registrations ?? []} error={error?.message} />
}
