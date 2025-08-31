<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <NuxtLink 
            to="/" 
            class="text-xl font-bold hover:text-blue-200 transition-colors"
          >
            🎲 D&D Manager
          </NuxtLink>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLink
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              :class="{ 'bg-blue-800': $route.name === 'home' }"
            >
              Domů
            </NuxtLink>
            
            <NuxtLink
              to="/dekujeme"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              :class="{ 'bg-blue-800': $route.name === 'players' }"
            >
              Děkujeme
            </NuxtLink>
            
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <svg
              class="h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t border-blue-500">
          <NuxtLink
            to="/"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
            :class="{ 'bg-blue-800': $route.name === 'home' }"
          >
            Domů
          </NuxtLink>
          
          <NuxtLink
            to="/players"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
            :class="{ 'bg-blue-800': $route.name === 'players' }"
          >
            Hráči a postavy
          </NuxtLink>
          
          <NuxtLink
            to="/simple"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
            :class="{ 'bg-blue-800': $route.name === 'simple' }"
          >
            Jednoduchá stránka
          </NuxtLink>
          
          <NuxtLink
            to="/test"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
            :class="{ 'bg-blue-800': $route.name === 'test' }"
          >
            Test API
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const mobileMenuOpen = ref(false);

// Zavřeme mobile menu při změně route
const route = useRoute();
watch(() => route.path, () => {
  mobileMenuOpen.value = false;
});
</script>
