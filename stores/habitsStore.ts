import { defineStore } from "pinia";
import type { Habit } from '~/types/habit'

export const useHabitsStore = defineStore('habits', () => {
  const habits = ref<Habit[]>([])

  const getHabits = async () => {
    const res = await $fetch('/api/habits')
    habits.value = res!
  }

  const addHabit = async (habit: Object) => {
    const newHabit: Habit = await $fetch('/api/habits', {
      method: 'post',
      body: habit
    })

    habits.value.push(newHabit)
  }

  return { habits, getHabits, addHabit }
})
