<script setup>
defineProps({
  label: String,
  icon: String,
  animated: Boolean,
})
</script>

<template>
<button class="button" :class="{animated: animated}">
  {{label}}
</button>
</template>

<style scoped>
.button {
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  font-size: 24px;
  background-color: #bde0fe;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
}

.button:hover {
  background-color: #a2d2ff;
}

.button.animated {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>