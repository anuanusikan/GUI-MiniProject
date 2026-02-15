<script setup lang="ts">
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
import ToastHost from "./components/ToastHost.vue"

</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <Navbar />
    <ToastHost />

    <main class="max-w-7xl mx-auto px-4">
      <router-view />
    </main>

    <Footer/>
    
  </div>
</template>

<style scoped>
/* Remove any scoped styles that might interfere */
</style>