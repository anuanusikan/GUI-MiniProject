<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
</script>

<template>
  <Navbar />
  <ToastHost />
  <main class="max-w-7xl mx-auto px-4">
    <router-view />
  </main>
</template>
