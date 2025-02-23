<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { User } from '~/types/user'
import { type HabitType, HabitTypes, type HabitPeriod, HabitPeriods } from '~/types/habit'
import { UInput } from '#components'

const habitsStore = useHabitsStore()
const openModal = ref(false)

const schema = z.object({
  title: z.string(),
  type: z.string(),
  period: z.enum(HabitPeriods),
  goal: z.number(),
  users: z.string()
    .optional()
    .transform(str => str ? str.split(',').map(email => email.trim()) : [])
    .refine(emails => emails.every(email => z.string().email().safeParse(email).success), {
      message: "One or more email addresses are invalid"
    })
})

type Schema = z.output<typeof schema>

const habitDetails = reactive({
  title: undefined,
  type: undefined,
  period: undefined,
  goal: undefined,
  users: undefined,
})

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  habitsStore.addHabit(habitDetails)  
  console.log('hello')

  openModal.value = false
  // reset modal
  habitDetails.title = undefined
  habitDetails.type = undefined
  habitDetails.period = undefined
  habitDetails.goal = undefined
  habitDetails.users = undefined
}
</script>

<template>
  <UButton @click='openModal = true' color="white" class="w-full h-36 flex items-center justify-center">
    <UIcon name="i-material-symbols:add-2-rounded" class="w-5 h-5" />
  </UButton>

  <UModal v-model="openModal">
    <h1>Add Project</h1>
    <UForm :schema="schema" :state="habitDetails" @submit="onSubmit">
      <UFormGroup label="Habit Title" name="title" class="w-full">
        <UInput v-model="habitDetails.title" />
      </UFormGroup>

      <UFormGroup label="Type" name='type' class="w-full">
        <UInputMenu v-model="habitDetails.type" :options="HabitTypes" placeholder="Select a type" />
      </UFormGroup>

      <UFormGroup label="Goal" name='goal' class="w-full">
        <UInput v-model="habitDetails.goal" type="number" />
      </UFormGroup>

      <UFormGroup label="Habit Period" name='period' class="w-full">
        <UInputMenu v-model="habitDetails.period" :options="HabitPeriods" placeholder="Select a duration" />
      </UFormGroup>

      <UFormGroup label="Invite others (email-addresses, comma seperated)" name="users">
        <UInput v-model="habitDetails.users" />
      </UFormGroup>

      <UButton type="submit" label="Add Habit" />
    </UForm>

  </UModal>
</template>

<style scoped></style>
