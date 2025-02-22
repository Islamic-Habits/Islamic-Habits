import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { Habit } from '~/types/habit'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  const body: Habit = await readBody(event)

  const { data, error } = await supabase
    .from('habits')
    .insert({
      data: body,
    })

  console.log(data)
  console.log(error)


  return { body }
})
