<template>
  <main class="container">
    <div class="contentCol">
      <div class="contentCol__item" v-for="city in citiesStore.filteredCities" :key="city.id" @click="openModal(city)">
				<div class="contentCol__item-title">
					<h3>Country: <span> {{ city.country }}</span></h3>
					<h3>Region: {{ city.region }}</h3>
				</div>
				<div class="contentCol__item-info">
					<span>wikiDataId: {{ city.wikiDataId }}</span>
					<span>Name: {{  city.name }}</span>
					<span>Population: {{ city.population }}</span>
				</div>
      </div>
    </div>
		<div v-if="isModalOpen" class="modal-container" @click="closeModal">
      <div class="modal" @click.stop>
				<City :city="selectedCity" @close="closeModal" />
      </div>
    </div>
		<h1 v-if="citiesStore.noResults" class="noResults">no results</h1>
  </main>
</template>

<script setup lang="ts">
import { useCitiesStore } from './../store/cities';
import { type City } from '~/types/city';

const citiesStore = useCitiesStore();
const isModalOpen = ref(false);
const selectedCity = ref<City | null>(null);

const openModal = (city:City) => {
  selectedCity.value = city;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCity.value = null;
};


// onMounted(() => {
//   citiesStore.fetchCities();
// });

// const loadMoreCities = () => {
//   citiesStore.fetchCities();
// };
</script>
