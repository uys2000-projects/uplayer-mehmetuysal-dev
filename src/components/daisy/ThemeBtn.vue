<template>
  <Dropdown :index="1" class="dropdown-end">
    <template #title>
      <button class="w-full h-full flex gap-0 rounded-btn p-0 overflow-hidden">
        <div class="w-2 h-full bg-base-100"></div>
        <div class="w-2 h-full bg-neutral"></div>
        <div class="w-2 h-full bg-primary"></div>
        <div class="w-2 h-full bg-accent"></div>
        <div class="w-2 h-full bg-base-300"></div>
      </button>
    </template>
    <template #content>
      <DropdownContent class="bg-neutral">
        <div class="h-96 overflow-auto flex flex-col gap-1">
          <template v-for="theme, index in themes">
            <button
              class="btn btn-ghost btn-sm w-full h-8 flex flex-row flex-nowrap gap-0 rounded-btn p-0 overflow-hidden flex-shrink-0"
              :data-theme="theme" @click="() => setTheme(theme)">
              <div class="w-2 h-full bg-base-100"></div>
              <div class="w-2 h-full bg-neutral"></div>
              <div class="w-2 h-full bg-primary"></div>
              <div class="w-2 h-full bg-accent"></div>
              <div class="w-2 h-full bg-base-300"></div>
            </button>
          </template>
        </div>
      </DropdownContent>
    </template>
  </Dropdown>
</template>
<script lang="ts">
import { useAppStore } from '@/stores/app';
import Dropdown from './Dropdown.vue';
import DropdownContent from './DropdownContent.vue';
import { setPrefence } from '@/services/capacitor/preferences';

export default {
  components: {
    Dropdown, DropdownContent
  },
  data() {
    return {
      appStore: useAppStore(),
      themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset",]
    };
  },
  methods: {
    setTheme(theme: string) {
      setPrefence("theme", theme)
      this.appStore.theme = theme;
      document.body.setAttribute("data-theme", theme);
    }
  }
}
</script>