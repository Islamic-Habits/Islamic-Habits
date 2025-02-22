<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { auth } = useSupabaseClient()

const schema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email('Invalid email'),
  password: z.string().min(2, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const userInfo = reactive({
  firstname: undefined,
  lastname: undefined,
  email: undefined,
  password: undefined
})

const errormsg = ref('')

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { data, error } = await auth.signUp({
    email: userInfo.email!,
    password: userInfo.password!,
    options: {
      data: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname
      }
    }
  })

  if (error) errormsg.value = error.message
  if (data) navigateTo('/login')

  console.log(data)
  console.log(error)

}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-800">
    <UForm :schema="schema" :state="userInfo" @submit="onSubmit"
      class="flex flex-col items-center w-full max-w-sm p-8 rounded bg-gray-900 shadow-md">
      <h1>Sign Up</h1>

      <UFormGroup label="First Name" name="firstname" class="w-full">
        <UInput v-model="userInfo.firstname" />
      </UFormGroup>

      <UFormGroup label="Last Name" name="lastname" class="w-full">
        <UInput v-model="userInfo.lastname" />
      </UFormGroup>


      <UFormGroup label="Email" name="email" class="w-full">
        <UInput v-model="userInfo.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password" class="w-full">
        <UInput v-model="userInfo.password" />
      </UFormGroup>

      <UAlert v-if="errormsg" title="Error" :description="errormsg" color="red" variant="soft" />
      <ULink to="/login">Already have an account? Login here!</ULink>

      <UButton type="submit" label="Signup" />
    </UForm>
  </div>

</template>
