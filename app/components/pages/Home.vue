<script setup lang="ts">
import { usePlayersAndCharactersQuery } from '~/data/hooks/players';
import PlayerModal from '~/components/PlayerModal.vue';

const { data: players, isLoading, error, refetch, suspense } = usePlayersAndCharactersQuery();

onServerPrefetch(async () => {
  await suspense()
});

definePageMeta({
  title: 'Domů',
  description: 'Domů'
});

// SEO metadata
useSeoMeta({
  title: 'D&D Správce hráčů a postav',
  description: 'Přehled všech hráčů a jejich postav v D&D kampani'
});
</script>


<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          D&D Správce hráčů a postav
        </h1>
        <p class="text-gray-600">
          Přehled všech hráčů a jejich postav
        </p>
      </div>

      <div v-if="isLoading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        <p class="mt-2 text-gray-600">Načítám data...</p>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 class="text-red-800 font-medium mb-2">Chyba při načítání dat</h3>
        <p class="text-red-700">{{ error }}</p>
        <Button class="mt-3" @click="refetch()">
          Zkusit znovu
        </Button>
      </div>

      <div v-else-if="players?.length > 0" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-800">
            Hráči ({{ players.length }})
          </h2>
          <PlayerModal>
            <Button variant="outline">
              Přidat hráče
            </Button>
          </PlayerModal>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PlayerCard
            v-for="playerData in players"
            :key="playerData.player.id"
            :player="playerData.player"
            :characters="playerData.characters"
          />
        </div>
      </div>

      <div v-else class="text-center py-12">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Žádní hráči</h3>
        <p class="text-gray-600 mb-4">Zatím nejsou v systému zaregistrováni žádní hráči.</p>
        <PlayerModal>
          <Button>
            Přidat prvního hráče
          </Button>
        </PlayerModal>
      </div>
    </div>
  </div>
</template>
