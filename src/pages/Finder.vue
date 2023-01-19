<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { searchRestaurants } from '../api';
import { useTheme } from '../composables';
import { useApi } from '../utils/useApi';

const route = useRoute();
const router = useRouter();

const { isDark, toggleDark, theme } = useTheme();

const { data, isLoading, isError } = useApi({
  queryFn: searchRestaurants,
});

const idRouteParam = () =>
  typeof route.params.id === 'string' ? route.params.id : '';

const selectedRestaurantId = ref<string>(idRouteParam());
const getSelectedRestaurant = computed(() => {
  if (data.value && selectedRestaurantId.value) {
    return data.value.business.find(
      restaurant => restaurant.id === selectedRestaurantId.value,
    );
  }
});

const handleSelectRestaurant = (id: string) => {
  router.push({ params: { id } });
};

watchEffect(() => (selectedRestaurantId.value = idRouteParam()));
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="header flex flex-row w-full justify-between items-center">
      <h1 class="m-3" text="2xl text-primary" font="bold">Restaurant Finder</h1>
      <i
        @click="toggleDark()"
        :class="{ 'i-ph-moon': isDark, 'i-ph-sun': !isDark }"
        class="w-8 h-8 mr-4"
      />
    </div>
    <Spinner v-if="isLoading"></Spinner>
    <Heading v-else-if="isError">Something went wrong :(</Heading>
    <div v-else class="flex flex-row w-full flex-grow">
      <div class="flex flex-col border-r-dark-800 border-r-width-1">
        <div class="">
          <Heading class="pl-6 bg-cool-gray-500 p-4 text-center"
            >{{ data?.total }} Restaurants</Heading
          >
        </div>
        <RestaurantList
          :restaurants="data?.business"
          :selectedId="selectedRestaurantId"
          @select-restaurant="handleSelectRestaurant"
          class="w-68 flex-grow h-0"
        />
      </div>
      <Restaurant
        v-if="selectedRestaurantId"
        :id="selectedRestaurantId"
        :restaurant="getSelectedRestaurant"
        class="flex-grow p-10"
      />
    </div>
  </div>
</template>

<style>
div {
  color: v-bind('theme.text');
}

.bg-theme {
  background-color: v-bind('theme.background');
}

.header {
  background-color: v-bind('theme.primary');
  color: #fff;
}
</style>
