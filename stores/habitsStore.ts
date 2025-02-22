import { defineStore } from "pinia";
import type { Habit } from '~/types/habit'

export const useHabitsStore = defineStore('habits', () => {
  const habits = ref<Habit[]>([])

  const getHabits = async () => {
    const res = await $fetch('/api/habits')
    habits.value = res!.data
  }

  const addHabit = async (habit: Habit) => {
    const res = await $fetch('/api/habits', {
      method: 'post',
      body: habit
    })

    console.log(res)
  }

  return { habits, getProjects: getHabits, addProject: addHabit }
})
