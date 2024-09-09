<script setup>
import Button from './components/Button.vue';

import ButtonRemote from 'remoteApp/Button';


</script>

<template>
  <h1>Host</h1>
  <p>{{ count }}</p>
  
  <Button />
  <ButtonRemote />
</template>

<style>
body {
  background-color: tomato;
}
</style>