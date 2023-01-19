<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: false,
    default: 5,
  },
});
</script>

<template>
  <div>
    <i
      v-for="n in maxValue"
      :class="{ 'i-mdi-star': n <= value, 'i-mdi-star-outline': n > value }"
    />
  </div>
</template>
