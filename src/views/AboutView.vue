<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
// Access the count state from the store with reactivity using storeToRefs
const { count, doubleCount } = storeToRefs(useCounterStore())
</script>
<template>
  <div class="about">
    <h1>This is an about page {{ count }} y el doble es: {{ doubleCount }}</h1>
    <button @click="counterStore.increment()">Increment</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
