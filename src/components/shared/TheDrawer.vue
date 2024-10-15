<template>
  <div class="drawer-side z-10">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full w-max p-4">
      <li>
        <RouterLink :to="{ name: 'HomeView' }" class="btn btn-neutral">UPlayer</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'ListView' }" class="btn btn-neutral">Play List</RouterLink>
      </li>
      <li class="mt-auto">
        <RouterLink :to="{ name: 'AboutView' }" class="btn btn-neutral">About</RouterLink>
      </li>
      <li :class="{ 'mb-12': appStore.adLoaded }">
        <RouterLink :to="{ name: 'SettingsView' }" class="btn btn-neutral">Settings</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';
import { RouterLink } from 'vue-router';
export default {
  components: { RouterLink },
  data() {
    return {
      appStore: useAppStore()
    }
  }
}
</script>