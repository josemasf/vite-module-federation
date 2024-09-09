<script setup lang="ts">
import { useCounter } from '../composables/useCounter'

const { count, increment } = useCounter()
</script>

<template>
  <button @click="increment">Count is {{ count }}</button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: lightblue;
  color: #000;
}
</style>