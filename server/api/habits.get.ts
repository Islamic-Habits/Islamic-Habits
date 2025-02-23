import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  const { data, error } = await supabase
    .from('habits')
    .select()

  let habits = data.map(item => ({
    ...item.data,
    ...{ id: item.id }
  }));
  console.log(data)
  console.log(habits)
  habits.id = data.id

  if (data) return habits
})
