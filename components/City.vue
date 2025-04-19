<template>
  <div @click="closeModal">
    <div @click.stop>
			<h2>City: {{ city.name }}</h2>
      <p>Country: {{ city.country }}</p>
      <p>Region: {{ city.region }}</p>
      <p>Population: {{ city.population }}</p>
      <p>wikiDataId: {{ city.wikiDataId }}</p>
      <customBut @click="closeModal" :title="buttonTitle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import customBut from './../UI/buttons/customBut.vue';
import { type City } from '~/types/city';

const buttonTitle = ref('Close')

defineProps<{city: City}>();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>
