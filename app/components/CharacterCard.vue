<script setup lang="ts">
import type { Character } from '@mj/api-demo/api/gen/ts/demo/v1/api_pb';

interface Props {
  character: Character;
  size?: 'x1' | 'x2' | 'x3' | 'x4';
  showLabels?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'x2',
  showLabels: true
});

const { data: race, isLoading: isRaceLoading, suspense: raceSuspense } = useRaceQuery({ id: props.character.raceId });
const { data: characterClass, isLoading: isClassLoading, suspense: classSuspense } = useClassQuery({ id: props.character.classId });

onServerPrefetch(async () => {
  await Promise.all([raceSuspense(), classSuspense()])
})


const isLoading = computed(() => isRaceLoading.value || isClassLoading.value)


const avatarClass = computed(() => {
  return `${race.value?.name}-${characterClass.value?.name}`.toLowerCase()
});

</script>

<template>
  <div class="flex flex-col items-center space-y-1">
    <div v-if="isLoading">
      <div class="animate-pulse h-12 w-12 rounded-full bg-gray-200"></div>
    </div>
    <template v-else>
    <div 
      class="avatar"
      :class="[avatarClass, size]"
    ></div>
    
    <div class="text-center">
      <div class="text-xs font-medium text-gray-900">{{ character.name }}</div>
      <div class="text-xs text-gray-500">
        {{ race?.name }} {{ characterClass?.name }}
      </div>
    </div>
    </template>
  </div>
</template>

<style scoped>
.avatar {
  width: 64px;
  height: 64px;
  background-image: url('/img/avatars.png');
  background-repeat: no-repeat;
  background-size: 195px 195px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
}

/* 3×3: Humans / Elves / Dwarves */
/* Row 1 – Humans */
.avatar.human-rogue   { background-position: 0px 0px; }
.avatar.human-mage    { background-position: -66px 0px; } /* -345px * 0.19 = -65.55px ≈ -66px */
.avatar.human-warrior { background-position: -131px 0px; } /* -690px * 0.19 = -131.1px ≈ -131px */

/* Row 2 – Elves */
.avatar.elf-rogue     { background-position: 0px -66px; }
.avatar.elf-mage      { background-position: -66px -66px; }
.avatar.elf-warrior   { background-position: -131px -66px; }

/* Row 3 – Dwarves */
.avatar.dwarf-rogue   { background-position: 0px -131px; }
.avatar.dwarf-mage    { background-position: -66px -131px; }
.avatar.dwarf-warrior { background-position: -131px -131px; }

.avatar.x1 { 
  width: 32px; 
  height: 32px; 
  background-size: 97px 97px; /* 1024px * 0.095 pro x1 */
}

/* x1 (scale 0.095) */
.avatar.x1.human-mage    { background-position: -33px 0px; } /* -66px * 0.5 */
.avatar.x1.human-warrior { background-position: -66px 0px; } /* -131px * 0.5 */
.avatar.x1.elf-rogue     { background-position: 0px -33px; }
.avatar.x1.elf-mage      { background-position: -33px -33px; }
.avatar.x1.elf-warrior   { background-position: -66px -33px; }
.avatar.x1.dwarf-rogue   { background-position: 0px -66px; }
.avatar.x1.dwarf-mage    { background-position: -33px -66px; }
.avatar.x1.dwarf-warrior { background-position: -66px -66px; }

.avatar.x3 { 
  width: 96px; 
  height: 96px; 
  background-size: 292px 292px; /* 1024px * 0.285 pro x3 */
}

/* x3 (scale 0.285/0.19 = 1.5) */
.avatar.x3.human-mage    { background-position: -99px 0px; } /* -66px * 1.5 */
.avatar.x3.human-warrior { background-position: -197px 0px; } /* -131px * 1.5 */
.avatar.x3.elf-rogue     { background-position: 0px -99px; }
.avatar.x3.elf-mage      { background-position: -99px -99px; }
.avatar.x3.elf-warrior   { background-position: -197px -99px; }
.avatar.x3.dwarf-rogue   { background-position: 0px -197px; }
.avatar.x3.dwarf-mage    { background-position: -99px -197px; }
.avatar.x3.dwarf-warrior { background-position: -197px -197px; }

.avatar.x4 { 
  width: 128px; 
  height: 128px; 
  background-size: 389px 389px; /* 1024px * 0.38 pro x4 */
}

/* x4 (scale 0.38/0.19 = 2) */
.avatar.x4.human-mage    { background-position: -132px 0px; } /* -66px * 2 */
.avatar.x4.human-warrior { background-position: -262px 0px; } /* -131px * 2 */
.avatar.x4.elf-rogue     { background-position: 0px -132px; }
.avatar.x4.elf-mage      { background-position: -132px -132px; }
.avatar.x4.elf-warrior   { background-position: -262px -132px; }
.avatar.x4.dwarf-rogue   { background-position: 0px -262px; }
.avatar.x4.dwarf-mage    { background-position: -132px -262px; }
.avatar.x4.dwarf-warrior { background-position: -262px -262px; }
</style>