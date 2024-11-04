<template>
  <header class="bg-neutral text-neutral-content flex justify-between items-center p-4 z-10 h-20 wide:py-0 wide:h-12">
    <div>
      <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden">
        <span class="material-symbols-outlined">
          menu
        </span>
      </label>
    </div>
    <div class="flex gap-2 h-8 w-max">
      <div v-if="appStore.downloading" class="radial-progress bg-primary text-primary-content border-primary"
        :style="`--value:${appStore.progress}; --size:2rem;`" role="progressbar">
        <span class="text-xs">{{ appStore.progress }}%</span>
      </div>
      <ThemeBtn />
    </div>
  </header>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import ThemeBtn from '../daisy/ThemeBtn.vue';
import { useAppStore } from '@/stores/app';

export default {
  components: { RouterLink, ThemeBtn },

  data() {
    return {
      appStore: useAppStore(),
    }
  },
}
</script>