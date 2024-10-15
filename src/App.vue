<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script lang="ts">
import { SplashScreen } from '@capacitor/splash-screen';
import { RouterView } from 'vue-router'
import { createDir, listen, readDir } from './services/capacitor/filesystem';
import { useAppStore } from './stores/app';
import { getPrefence } from './services/capacitor/preferences';
import { initializeAdMob, showAdMobBanner } from './services/capacitor/Admob';
export default {
  components: {
    RouterView
  },
  data() {
    return {
      appStore: useAppStore()
    }
  },
  methods: {
    async loadTheme() {
      const theme = await getPrefence("theme")
      this.appStore.theme = theme || "light"
      document.body.setAttribute("data-theme", this.appStore.theme || "light");
    },
    hideSplash() {
      setTimeout(() => SplashScreen.hide({
        fadeOutDuration: 1000,
      }), 1000);
    },
    async loadBanner() {
      await initializeAdMob()
      showAdMobBanner(() => {
        this.appStore.adLoaded = true
      })
    }
  },
  async mounted() {
    await this.loadTheme()
    this.hideSplash()
    this.loadBanner()
  }
}
</script>


<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>