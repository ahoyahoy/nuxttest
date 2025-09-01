<script setup lang="ts">
import type {Character, Player} from '@mj/api-demo/api/gen/ts/demo/v1/api_pb'

import {Trash2} from 'lucide-vue-next'
import {ref} from 'vue'
import {toast} from 'vue-sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {Button} from '@/components/ui/button'
import {usePlayerDeleteMutation} from '@/data/hooks/players'

interface PlayerCardProps {
  player: Player
  characters: Character[]
}

defineProps<PlayerCardProps>()

const isDeleteDialogOpen = ref(false)
const deleteMutation = usePlayerDeleteMutation()

const handleDelete = async (playerId: string) => {
  try {
    await deleteMutation.mutateAsync({id: playerId})
    toast.success('Hráč byl úspěšně smazán')
    isDeleteDialogOpen.value = false
  }
  catch (error) {
    console.error('Error deleting player:', error)
    toast.error('Nepodařilo se smazat hráče')
  }
}
</script>

<template>
  <div class="border rounded-lg p-4 shadow-sm bg-white">
    <!-- Hráč info s tlačítkem pro smazání -->
    <div class="mb-4 flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">
          {{ player.firstName }} {{ player.lastName }}
        </h3>
        <p class="text-sm text-gray-600">
          {{ player.email }}
        </p>
      </div>

      <!-- Tlačítko pro smazání -->
      <AlertDialog v-model:open="isDeleteDialogOpen">
        <AlertDialogTrigger as-child>
          <Button
            variant="ghost"
            size="sm"
            class="text-red-600 hover:text-red-700 hover:bg-red-50"
            :disabled="deleteMutation.isPending.value"
          >
            <Trash2 class="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Smazat hráče</AlertDialogTitle>
            <AlertDialogDescription>
              Opravdu chcete smazat hráče <strong>{{ player.firstName }} {{ player.lastName }}</strong>?
              Tato akce je nevratná a smaže také všechny jeho postavy.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Zrušit</AlertDialogCancel>
            <AlertDialogAction
              class="bg-red-600 hover:bg-red-700"
              :disabled="deleteMutation.isPending.value"
              @click="handleDelete(player.id)"
            >
              {{ deleteMutation.isPending.value ? 'Mazání...' : 'Smazat' }}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <!-- Postavy jako malé avatary -->
    <div v-if="characters.length > 0">
      <h4 class="text-sm font-medium text-gray-700 mb-3">
        Postavy ({{ characters.length }}):
      </h4>
      <div class="flex flex-wrap gap-3">
        <CharacterCard
          v-for="character in characters"
          :key="character.id"
          :character="character"
          size="x2"
          :show-labels="true"
        />
      </div>
    </div>

    <div
      v-else
      class="text-sm text-gray-500 italic"
    >
      Žádné postavy
    </div>
  </div>
</template>
