<template>
  <div class="toggleSwitch">
    <div :class="['option', { active: isColumn }]" @click="setActive(true)">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>

    <div :class="['option', { active: !isColumn }]" @click="setActive(false)">
      <div class="square-row">
        <span class="square"></span>
        <span class="square"></span>
      </div>
      <div class="square-row">
        <span class="square"></span>
        <span class="square"></span>
      </div>
    </div>

    <div class="highlight" :style="{ transform: isColumn ? 'translateX(0)' : 'translateX(100%)' }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isColumn = ref(true);

const setActive = (newState: boolean) => {
  if (isColumn.value !== newState) {
    isColumn.value = newState;
  }
};
</script>

<style scoped lang="scss">
.toggleSwitch {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.555);
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;

  .option {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 4px;
    padding-right: 6px;
    z-index: 1;
    transition-duration: 200ms;

    &:hover {
      scale: 1.1;
    }

    &:hover .line {
      background-color: rgb(18, 212, 202);
    }

    &:hover .square {
      background-color: rgb(18, 212, 202);
    }
  }

  .line {
    width: 24px;
    height: 3px;
    background-color: #000;
    border-radius: 2px;
    transition-duration: 700ms;
  }

  .square-row {
    display: flex;
    gap: 4px;
  }

  .square {
    width: 8px;
    height: 8px;
    background-color: #000;
    border-radius: 2px;
    transition-duration: 700ms;
  }

  .highlight {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 6px;
    transition: transform 0.3s ease;
    transform: translateX(0);
    z-index: 0;
  }
}
</style>
