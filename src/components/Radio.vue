<template>
  <div class="custom-radio">
    <label v-if="options" v-for="option in options" :key="option.value" class="radio-label">
      <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue?.value === option.value"
          @change="updateValue(option)"
      />
      <span v-if="option" class="custom-radio-button"></span>
      <span v-html="option.label"/>
    </label>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (value) => {
  emit('update:modelValue', value);
};
</script>

<style scoped>
.custom-radio {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  user-select: none;
}
.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
}
input[type="radio"] {
  display: none;
}
.custom-radio-button {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border: 2px solid #007bff;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  position: relative;
}
.custom-radio-button::before {
  content: "";
  width: 25px;
  height: 25px;
  background-image: url("../assets/booba.png");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease-in-out;
}

input[type="radio"]:checked + .custom-radio-button::before {
  transform: translate(-50%, -50%) scale(1);
}
</style>
