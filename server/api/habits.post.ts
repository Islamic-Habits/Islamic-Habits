import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'
import { Habit } from '~/types/habit'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  let body = await readBody(event)

  // make users array of emails
  let users = body.users ? body.users.split(',') : []

  // store own user as well
  users.push(user.email)
  body.users = users

  const { data, error } = await supabase
    .from('habits')
    .insert({
      data: body,
    })
    .select()

  console.log('data')
  console.log(data)

  console.log('body')
  console.log(body)

  const emptyLog = body.users.map(email => ({
    user_email: email,
    isCompleted: false
  }))

  let habitId = data[0].id
  console.log(habitId)
  const { logs, err } = await supabase
    .from('habitlogs')
    .insert({
      data: {
        habit_id: habitId,
        logs: emptyLog
      }
    })
    .select()
  console.log(logs)


  //console.log(data)
  //console.log(error)

  return data[0]
})
