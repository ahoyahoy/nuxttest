<template>
  <div id="app">
    <!-- Navigace -->
    <AppNavigation />

    <!-- Hlavní obsah -->
    <main>
      <NuxtPage />
    </main>

    <!-- Toast notifikace -->
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import {Toaster} from '@/components/ui/sonner'

// Pro SEO meta tagy můžeme použít Nuxt composables
useHead({
  titleTemplate: '%s | D&D Manager',
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
})
</script>

<style scoped>
/* Page transition animace */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
