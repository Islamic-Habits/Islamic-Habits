<script setup lang="ts">
  import { ref } from "vue";
  import type { Habit } from '~/types/habit';
  
  const props = defineProps<{ habit: Habit }>();
  const isCompleted = ref(false);
  const completeHabit = () => {
    isCompleted.value = !isCompleted.value;
    console.log(`Habit "${props.habit.title}" marked as complete`);
  }
</script>

<template>
  <div class="habit-card">
    <div class="habit-info">
      <h3>{{ props.habit.data.title }}</h3>
      <p>{{ props.habit.data.type }}</p>
    </div>
    <button :disabled="isCompleted" @click="completeHabit">
      {{ isCompleted ? "✔ Completed" : "Mark as Done" }}
    </button>
  </div>
</template>

<style scoped>
.habit-card{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
}

.habit-info h3{
  margin:0;
  font-size: 18px;
  color: aqua;  
}
.habit-info p{
  font-size: 14px;
  color: #555;
}
button{
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
}
</style>