<script setup>
import { onMounted, onUnmounted } from "vue";
import { useWebNotification } from "@vueuse/core"; // Ensure VueUse is installed

const {
  isSupported,
  show,
  onClick
} = useWebNotification({
  title: "Habit Reminder",
  body: "Don't forget to complete your habit!",
  dir: "auto",
  lang: "en",
  renotify: true,
  tag: "habit-reminder",
});

let notificationInterval;
show()
onMounted(() => {
  if (isSupported.value) {
    // Trigger notification every 5 minutes (300,000 ms)
    notificationInterval = setInterval(() => {
      show();
      console.log("Habit reminder sent!");
    }, 300000); // 5 minutes in milliseconds
  }
});
// Handle Notification Click
onClick(() => {
  window.open("http://localhost:3000/api/habits", "_blank"); // Change to your actual website
});
onUnmounted(() => {
  // Clear interval when component is destroyed
  if (notificationInterval) clearInterval(notificationInterval);
});
</script>

<template>
  <div>
    <p>Habit reminders will be sent every 5 minutes!</p>
  </div>
</template>
