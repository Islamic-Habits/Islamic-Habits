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
</script>
<template>
  <h1>Welcome {{ user.user_metadata.firstname }} {{ user.user_metadata.lastname }}</h1>
  <UButton @click='logout' label="signout" />
  <PushNotification/>
  <UContainer>
    <h1>Habits</h1>
    <HabitsAddHabitCard />
    <HabitCard v-for="habit in habitsStore.habits" :habit="habit"/>
  </UContainer>
</template>
