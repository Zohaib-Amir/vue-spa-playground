<script setup lang="ts">
// import { useI18n } from 'vue-i18n';
import { PropType } from 'vue';
import { Restaurant } from '../../data/restaurant';

defineProps({
  restaurant: {
    type: Object as PropType<Restaurant>,
    required: false,
  },
  id: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <div class="bg-theme flex flex-col overflow-y-auto">
    <div
      class="flex flex-row flex-wrap justify-between 2xl:justify-start 2xl:gap-40"
    >
      <div class="flex flex-col gap-6">
        <h2 class="text-3xl font-bold underline">{{ restaurant?.name }}</h2>
        <Rating v-if="restaurant?.rating" :value="restaurant?.rating" />
        <Text>
          <i i="mdi-map-marker dark:c-white" />{{
            restaurant?.location.formatted_address
          }}
        </Text>
        <a class="hover:underline" :href="`tel:${restaurant?.phone}`">
          <Text> <i i="mdi-phone dark:c-white" />{{ restaurant?.phone }} </Text>
        </a>
      </div>
      <div v-if="restaurant?.photos.length" class="m-2">
        <img class="h-60" :src="restaurant?.photos[0]" />
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-3xl font-bold">Reviews</h2>
      <ReviewsList :reviews="restaurant?.reviews" />
    </div>
  </div>
</template>
