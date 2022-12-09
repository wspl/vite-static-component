<script setup lang="ts">
import { shallowRef } from 'vue'

const count = shallowRef(0)
</script>

<template>
  <p>Static Content: {{ count }}</p>
  <button @click="count++">
    incr
  </button>
</template>
