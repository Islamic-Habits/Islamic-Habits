<script setup lang="ts">
import { UContainer } from "#components";
import { ref } from "vue";
import type { Habit } from '~/types/habit';

const props = defineProps<{ habit: Habit, email: string }>();

//TODO:  save user progress locally

const count = ref(0)
const goal = ref(props.habit.goal)
console.log(props.email)

const isComplete = ref(false)
let completeHabit = async () => {
  console.log('complete')
  isComplete.value = !isComplete.value

  const res = await $fetch('/api/completehabit', {
    method: 'post',
    body: {
      email: props.email,
      isCompleted: true,
      habitId: props.habit.id
    }
  })
}
</script>

<template>
  {{ props }}
  <UCard class="border border-gray-100 mb-3 shadow-md">
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-semibold text-gray-800">
          {{ props.habit.title }}
        </h3>
        <UBadge
          :color="props.habit.type === 'quran' ? 'blue' : props.habit.type === 'istighfaar' ? 'emerald' : 'purple'"
          variant="subtle" size="sm" class="mt-1">
          {{ props.habit.type }}
        </UBadge>
      </div>
    </div>

    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-gray-600">Today's Progress</span>
        <span class="font-semibold">
          <UButton label="+" @click="count++" />
          <UButton label="-" color="red" @click="count--" />
          {{ count }}/{{ goal }}
        </span>
      </div>

      <UProgress :value="(count / goal) * 100" color="emerald" class="w-full" />

      <div class="flex gap-2">
        <UButton @click="completeHabit" :color="isComplete ? 'red' : 'emerald'" variant="soft" block>
          {{ isComplete ? 'Completed' : 'Complete' }}
        </UButton>
      </div>
    </div>
  </UCard>
</template>
