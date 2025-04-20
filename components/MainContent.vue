<template>
  <main class="container">
		<div v-if="showLoader" class="load">
			<loader style="margin: 0 auto" />
		</div>
		<div :class="citiesStore.view === 'Column' ? 'contentCol' : 'contentGrid'">
      <div :class="citiesStore.view === 'Column' ? 'contentCol__item' : 'contentGrid__item'" v-for="city in citiesStore.filteredCities" :key="city.id" @click="openModal(city)">
        <div :class="citiesStore.view === 'Column' ? 'contentCol__item-title' : 'contentGrid__item-title'">
          <h3>
            Country: <span> {{ city.country }}</span>
          </h3>
          <h3>
            Region: <span> {{ city.region }}</span>
          </h3>
        </div>
        <div :class="citiesStore.view === 'Column' ? 'contentCol__item-info' : 'contentGrid__item-info'">
					<h4>
            Name: <span> {{ city.name }}</span>
          </h4>
					<h4>
            Population: <span> {{ city.population }}</span>
          </h4>
					<h4>
            WikiDataId: <span> {{ city.wikiDataId }}</span>
          </h4>
        </div>
      </div>
			<!-- scroll threshold -->
			<div ref="sentinel" style="height: 1px;"></div>
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
import loader from './../UI/loader.vue';
import { type City } from '~/types/city';

const citiesStore = useCitiesStore();
const isModalOpen = ref(false);
const selectedCity = ref<City | null>(null);

// for dynamic data loading
const lastFetchTime = ref(0);
const FETCH_COOLDOWN = 5000; // 5 second
const observer = ref<IntersectionObserver | null>(null);
const sentinel = ref<HTMLElement | null>(null);

const openModal = (city: City) => {
  selectedCity.value = city;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedCity.value = null;
};

const showLoader = computed(() => {
  return citiesStore.isLoading
});

onMounted(() => {
	console.log("fetchCities INIT")
  // citiesStore.fetchCities();
	observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && 
          !citiesStore.isLoading && 
          Date.now() - lastFetchTime.value > FETCH_COOLDOWN) {
        
        console.log('download the following data');
        lastFetchTime.value = Date.now();
        // citiesStore.fetchCities();
      }
    },
    {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    }
  );

  if (sentinel.value) {
    observer.value.observe(sentinel.value);
  }
});

onBeforeUnmount (() => {
	if (observer.value) {
    observer.value.disconnect();
  }
});




</script>
