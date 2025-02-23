<script setup lang="ts">
import {ref, onMounted} from 'vue';

const habitlogs = ref(null);
const getHabitLogs = async () => {
    try{
        const response = await $fetch('/api/habitlogs');
        habitlogs.value = response.data;
        console.log(JSON.parse(JSON.stringify(habitlogs.value[0].data.logs[0])))

    }catch(error){
        console.log("Error fetching habit logs: ", error)
    }
}

onMounted(() =>{
    getHabitLogs();
})
const actualTable = computed(() => {
  const firstRow = habitlogs.value;
  if (firstRow && firstRow.data && Array.isArray(firstRow.data.logs)) {
    return firstRow.data.logs.filter(item => item != null);
  }
  return [];
});
const table = [{
    name: "Mohamed El khoukhi",
    completed: "✔ Completed"
},{
    name: "Hamza Rafi",
    completed: "✔ Completed"
},{
    name: "Mohamed Younes",
    completed: "✔ Completed"
}]
</script>
<template>
    <div class="min-h-screen bg-emerald-50 p-6">
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mb-10">
            <h1 class="text-3xl font-bold text-emerald-800 mb-2">Istigfar</h1>
            <h2 class="text-emerald-600">Dhikr</h2>
            <UTable :rows="table" />
        </div>
    </div>
</template>