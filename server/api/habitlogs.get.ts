import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  const { data, error } = await supabase
    .from('habitlogs')
    .select('data')

  if (data) return { data }
})
