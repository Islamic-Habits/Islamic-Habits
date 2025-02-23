<script setup>
import { HabitsHabitCard, HabitsAddHabitCard } from '#components'
import HabitCard from '~/components/Habits/HabitCard.vue'

const { auth } = useSupabaseClient()
const user = useSupabaseUser()
const habitsStore = useHabitsStore()

const logout = async () => {
  await auth.signOut()
  navigateTo('/login')
}

onMounted(() => {
  habitsStore.getHabits()
})
useColorMode().preference = 'light'

let uii = {
  base: 'bg-white text-black border-gray-300 dark:bg-white dark:text-black dark:border-gray-300'
}
</script>
<template>
  <header class="max-w-2xl mx-auto flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-emerald-800 text-center">Islamic Habits Tracker</h1>
      <p class="text-emerald-600 text-center mt-2">Track your daily spriritual goals</p>
    </div>


    <UButton @click='logout' label="Log Out"
      class="!bg-emerald-100 !text-emerald-700 rounded-md hover:!bg-emerald-200 transition-colors" />
  </header>
  <h2 class="text-3xl font-arabic text-emerald-800 mb-1 text-center">{{ user.user_metadata.firstname }}
    السلام عليكم
  </h2>

  <UContainer>
    <HabitsAddHabitCard />
    <HabitCard v-for="habit in habitsStore.habits" :habit="habit" :email="user.email" />
  </UContainer>
</template>
