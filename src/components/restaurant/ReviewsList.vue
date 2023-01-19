<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import { PropType } from 'vue';
import { Review } from '../../data/restaurant';

defineProps({
  reviews: {
    type: Array as PropType<Array<Review>>,
  },
});
</script>
<template>
  <div class="flex flex-col h-0">
    <div v-for="review in reviews" class="pl-6 p-3 mt-4">
      <Rating :value="review.rating" />
      <Text class="mt-3">{{ review.text }}</Text>
    </div>
  </div>
</template>
