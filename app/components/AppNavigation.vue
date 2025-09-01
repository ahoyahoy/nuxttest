<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { locales } = useI18n()

const mobileMenuOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <NuxtLinkLocale to="home" class="text-xl font-bold hover:text-blue-200 transition-colors">
            🎲 D&D Manager
          </NuxtLinkLocale>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <NuxtLinkLocale to="home"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              active-class="bg-blue-800">
              {{ $t('navigation.home') }}
            </NuxtLinkLocale>

            <NuxtLinkLocale to="grant-thanks"
              class="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              active-class="bg-blue-800">
              {{ $t('navigation.thanks') }}
            </NuxtLinkLocale>

            <div class="flex items-center space-x-2 ml-4">
              <SwitchLocalePathLink v-for="loc in locales" :key="loc.code" :locale="loc.code"
                class="px-2 py-1 rounded text-xs" active-class="bg-blue-800">
                {{ loc.code.toUpperCase() }}
              </SwitchLocalePathLink>
            </div>

          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white"
            @click="mobileMenuOpen = !mobileMenuOpen">
            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 border-t border-blue-500">
          <NuxtLinkLocale :to="'/'"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
            active-class="bg-blue-800" @click="mobileMenuOpen = false">
            {{ $t('navigation.home') }}
          </NuxtLinkLocale>

          <NuxtLinkLocale :to="'/dekujeme'"
            class="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors"
            active-class="bg-blue-800" @click="mobileMenuOpen = false">
            {{ $t('navigation.thanks') }}
          </NuxtLinkLocale>

          <div class="flex space-x-2 px-3 py-2">
            <SwitchLocalePathLink v-for="loc in locales" :key="loc.code" :locale="loc.code"
              class="px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors" active-class="bg-blue-800"
              @click="mobileMenuOpen = false">
              {{ loc.code.toUpperCase() }}
            </SwitchLocalePathLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
