<template>
	<header class="header">
		<h1 class="header__logo">April Pharmacy</h1>
		<div class="header__content">
      <form class="header__filters">
        <input
          class="header__filters-param"
          :class="{ 'header__filters-param_isError': isError }"
          v-model="filterParams.country"
          type="text"
          placeholder="country"
        />
        <input
          class="header__filters-param"
          :class="{ 'header__filters-param_isError': isError }"
          v-model="filterParams.region"
          type="text"
          placeholder="region"
        />
        <input
          class="header__filters-param"
          :class="{ 'header__filters-param_isError': isError }"
          v-model="filterParams.name"
          type="text"
          placeholder="city name"
        />
        <input
          class="header__filters-param"
          :class="{ 'header__filters-param_isError': isError }"
          v-model="filterParams.population"
          type="number"
          placeholder="min population"
        />
      </form>
			<div class="header__actions">
				<customBut @click="funcFilters" :title="buttonSearch" />
				<toggle />
			</div>
    </div>
  </header>
</template>

<script setup lang="ts">
import customBut from './../UI/customBut.vue';
import toggle from './../UI/toggle.vue';
import { useCitiesStore } from './../store/cities';
import type { FilterParams } from '~/types/city';

const citiesStore = useCitiesStore();
const buttonSearch = ref<'Search' | 'Clear'>('Search');
const isError = ref(false);

const filterParams = reactive<FilterParams>({
  country: undefined,
  region: undefined,
  name: undefined,
  population: null,
});

const funcFilters = async () => {
  const hasFilters =
    filterParams.country || filterParams.region || filterParams.name || filterParams.population !== null;

  if (!hasFilters) {
    isError.value = true;
    setTimeout(() => {
      isError.value = false;
    }, 1000);
    return;
  }

  if (buttonSearch.value === 'Search') {
    await citiesStore.fitered(filterParams);
  } else {
    await citiesStore.fitered({});

    filterParams.country = undefined;
    filterParams.region = undefined;
    filterParams.name = undefined;
    filterParams.population = null;
  }

  buttonSearch.value = buttonSearch.value === 'Search' ? 'Clear' : 'Search';
};
</script>
