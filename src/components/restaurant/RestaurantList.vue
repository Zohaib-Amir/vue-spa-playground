<script setup lang="ts">
import { PropType } from 'vue';
import { Restaurant } from './../../data/restaurant';
import { useTheme } from '/@/composables';

defineProps({
  restaurants: {
    type: Array as PropType<Array<Restaurant>>,
  },
  selectedId: {
    type: String,
  },
});

const { theme } = useTheme();

const fullAddress = (restaurant: Restaurant) => {
  if (!restaurant.location.address1) {
    return restaurant.location.city;
  }
  return `${restaurant.location.address1}, ${restaurant.location.city}`;
};

defineEmits<{
  (e: 'selectRestaurant', id: string): void;
}>();
</script>
<template>
  <div class="flex flex-col overflow-y-auto">
    <div
      v-for="restaurant in restaurants"
      class="pl-6 p-3 cursor-pointer"
      :class="[restaurant.id === selectedId ? 'selected-row' : 'bg-theme']"
      @click="$emit('selectRestaurant', restaurant.id)"
      :key="restaurant.id"
    >
      <Heading>{{ restaurant.name }}</Heading>
      <Text>
        <i i="mdi-map-marker dark:c-white" />
        {{ fullAddress(restaurant) }}
      </Text>
    </div>
  </div>
</template>

<style>
.selected-row {
  background-color: v-bind('theme.highlight');
}
</style>
