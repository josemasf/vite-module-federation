
<script setup lang="ts">
//import { useCounter } from '../composables/useCounter'
import {useCounter} from 'remoteApp/ButtonState';

const { count, increment } = useCounter()
</script>

<template>
  <button @click="increment">Count is {{ count }} in host</button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>