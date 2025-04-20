<template>
  <div>
    <h2 class="modal__title">City: {{ city.name }}</h2>
    <div class="modal__content">
      <p><span class="modal__label">Type:</span> {{ city.type }} (ID: {{ city.id }})</p>
      <p><span class="modal__label">Country:</span> {{ city.country }} (Code: {{ city.countryCode }})</p>
      <p>
        <span class="modal__label">Region:</span> {{ city.region }} (Code: {{ city.regionCode }}, WikiDataId:
        {{ city.regionWdId }})
      </p>
      <p>
        <span class="modal__label">Coordinates -> </span>
        <a
          class="modal__link"
          :href="`https://www.google.com/maps?q=${city.latitude},${city.longitude}`"
          target="_blank"
        >
          Latitude {{ city.latitude }}, Longitude {{ city.longitude }}
        </a>
      </p>
      <p><span class="modal__label">Population:</span> {{ city.population }}</p>
      <p><span class="modal__label">WikiDataId:</span> {{ city.wikiDataId }}</p>
    </div>
    <customBut @click="$emit('close')" :title="buttonTitle" />
  </div>
</template>

<script setup lang="ts">
import customBut from './../UI/customBut.vue';
import { type City } from '~/types/city';

const buttonTitle = ref('Close');

defineProps<{ city: City }>();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
