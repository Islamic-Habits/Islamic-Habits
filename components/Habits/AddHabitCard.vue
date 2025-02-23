<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { User } from '~/types/user'
import { type HabitType, HabitTypes, type HabitPeriod, HabitPeriods } from '~/types/habit'
import { UInput } from '#components'

const habitsStore = useHabitsStore()
const modelValue = ref(false)

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

  modelValue.value = false

  // reset modal
  habitDetails.title = undefined
  habitDetails.type = undefined
  habitDetails.period = undefined
  habitDetails.goal = undefined
  habitDetails.users = undefined
}

let modalUi = {
  background: 'bg:white dark:bg-white rounded-lg shadow-md p-6 mb-8'
}

</script>

<template>
  <UButton @click='modelValue = true'
    class="w-full py-3 px-4 !bg-emerald-600 !text-white hover:!bg-emerald-700 transition-colors flex items-center justify-center space-x-2 mb-4"
    icon="i-material-symbols:add-2-rounded">
    <span class="text-white">
      Create new habit
    </span>
  </UButton>

  <UModal v-model="modelValue" :ui="modalUi"
    class="max-w-2xl mx-auto !bg-white rounded-lg shadow-md p-6 mb-8 flex justify-items  items-center">
    <div class="flex justify-center">
      <h2 class="text-xl font-semibold text-emerald-600 mb-4">Create new Habit</h2>
    </div>
    <UForm :schema="schema" :state="habitDetails" @submit="onSubmit">

      <UFormGroup label="Habit Title" name="title" class="w-full mb-2">
        <UInput v-model="habitDetails.title" placeholder="e.g., Daily Dhikr" />
      </UFormGroup>

      <UFormGroup label="Type" name='type' class="w-full mb-2">
        <UInputMenu v-model="habitDetails.type" :options="HabitTypes" placeholder="Select a type" />
      </UFormGroup>

      <UFormGroup label="Goal" name='goal' class="w-full mb-2">
        <UInput v-model="habitDetails.goal" type="number" placeholder=100 />
      </UFormGroup>

      <UFormGroup label="Habit Period" name='period' class="w-full mb-2">
        <UInputMenu v-model="habitDetails.period" :options="HabitPeriods" placeholder="Select a duration" />
      </UFormGroup>

      <UFormGroup label="Invite others (email-addresses, comma seperated)" name="users" class="mb-2">
        <UInput v-model="habitDetails.users" placeholder="someone@example.com, another@example.com" />
      </UFormGroup>

      <div class="flex justify-center mt-4">
        <UButton type="submit" label="Add Habit"
          class="!bg-emerald-600 !text-white hover:!bg-emerald-700 transition-colors mx-auto" />
      </div>
    </UForm>

  </UModal>
</template>

<style scoped></style>
