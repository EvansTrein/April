<template>
  <button class="button">{{ title }}</button>
</template>

<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>

<style lang="scss">
.button {
  padding: 2px 4px;
  cursor: pointer;
  border: 0;
  color: black;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.555);
  box-shadow: rgb(0, 0, 0, 5%) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.5s ease;
  width: 100px;

  &:hover {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0 0% 100%);
    box-shadow: rgb(93, 24, 220) 0px 7px 29px 0px;
  }

  &:active {
    letter-spacing: 3px;
    background-color: hsl(261deg 80% 48%);
    color: hsl(0 0% 100%);
    box-shadow: rgb(93, 24, 220) 0px 0px 0px 0px;
    transform: translateY(5px);
    transition: 100ms;
  }
}
</style>
