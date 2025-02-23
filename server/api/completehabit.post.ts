import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

  let body = await readBody(event)
  console.log('aaaa')
  console.log(body)

  const { data, error } = await supabase
    .from('habitlogs')
    .select()
    .eq('data->>habit_id', body.habitId)
    .single()

  //
  //console.log(data)
  //console.log(error)
  //

  let currentLog = data || []
  console.log(currentLog)

  let updatedLogs = currentLog.data.logs.map(log =>
    log.user_email === user.email ? { ...log, isCompleted: true } : log
  );
  console.log('asdasd')
  console.log(updatedLogs.data.logs[0])
  console.log(updatedLogs.data.logs[1])


  const { data, error } = await supabase
    .from('habitlogs')
    .update({ data: { ...data.data, updatedLogs } })
    .select()
  console.log(data)
  //
  return data

})
