<script setup lang="ts">
import type { Ref } from 'vue'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const { auth } = useSupabaseClient()
const user = useSupabaseUser()

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(2, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const credentials = reactive({
  email: undefined,
  password: undefined
})

const errormsg = ref('')

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  const { data, error } = await auth.signInWithPassword({
    email: credentials.email!,
    password: credentials.password!
  })

  // display error
  if (error) {
    errormsg.value = error.message
  }

  if (error) console.log('hi')

  navigateTo('/confirm')

}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <UForm :schema="schema" :state="credentials" @submit="onSubmit"
      class="flex flex-col items-center w-full max-w-sm p-8 rounded bg-white shadow-md">
      <h1>Login</h1>

      <UFormGroup label="Email" name="email" class="w-full">
        <UInput v-model="credentials.email" />
      </UFormGroup>

      <UFormGroup label="Password" name="password" class="w-full">
        <UInput v-model="credentials.password" />
      </UFormGroup>

      <UAlert v-if="errormsg" title="Error" :description="errormsg" color="red" variant="soft" />

      <ULink to="/signup">Don't have an account? Signup here!</ULink>
      <UButton type="submit" label="Submit" />
    </UForm>
  </div>

</template>
