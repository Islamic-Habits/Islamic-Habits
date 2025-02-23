<script setup lang="ts">
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import { HabitType } from '~/types/habit'
import type { User } from '~/types/user'

const habitsStore = useHabitsStore()
const openModal = ref(false)

const schema = z.object({
  title: z.string(),
  type: z.nativeEnum(HabitType),
})

//users: z.array(z.string())

type Schema = z.output<typeof schema>

users: z.array(z.string())
const habitDetails = reactive({
  title: undefined,
  type: HabitType,
  users: undefined
})

let habitTypes = Object.values(HabitType)
let selectedHabit = ref<HabitType | null>(null)

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  habitsStore.addHabit(habitDetails)  
  console.log('hello')
  console.log(habitDetails)

  openModal.value = false
  //projectDetails.name = undefined
  //projectDetails.description = undefined
}
</script>

<template>
  <UButton @click='openModal = true' color="gray" class="w-full h-36 flex items-center justify-center">
    <UIcon name="i-material-symbols:add-2-rounded" class="w-5 h-5" />
  </UButton>

  <UModal v-model="openModal">
    <h1>Add Project</h1>
    <UForm :schema="schema" :state="habitDetails" @submit="onSubmit">
      <UFormGroup label="Habit Title" name="title" class="w-full">
        <UInput v-model="habitDetails.title" />
      </UFormGroup>

      <UFormGroup label="Habit Type" name='type' class="w-full">
        <UInputMenu v-model="habitDetails.type" :options="habitTypes" placeholder="Select a type" />
      </UFormGroup>

      <UButton type="submit" label="Add Habit" />
    </UForm>

  </UModal>
</template>

<style scoped></style>
