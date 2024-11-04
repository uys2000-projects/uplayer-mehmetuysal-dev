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
import { useAppStore } from './stores/app';
import { getPrefence } from './services/capacitor/preferences';
import { initializeAdMob, showAdMobBanner } from './services/capacitor/admob';
import { backButtonListener, exit } from './services/capacitor/app';
import { checkPermissions, downloadFile, listen, removeListeners, requestPermissions } from './services/capacitor/filesystem';
import type { UPlayListItem } from './types/playlist';
import type { ProgressStatus } from '@capacitor/filesystem';
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
    setProgress(progress: ProgressStatus) {
      this.appStore.setProgress(progress.bytes, progress.contentLength)
    },
    async downloadItem() {
      while (this.appStore.downloadQueue.length > 0) {
        const item = this.appStore.downloadQueue.shift() as UPlayListItem;
        this.appStore.downloading = item
        if (!(await checkPermissions.uLog()))
          if (!(await requestPermissions.uLog())) {
            this.appStore.toast = "error"
            this.appStore.toastLabel = "Permissions not granted"
            return
          }
        this.appStore.toast = "info"
        this.appStore.toastLabel = `${item.name} started.`
        await downloadFile(item.url, `${item.name}${item.url.match(/[.][^.\/]*$/)}`).catch(() => {
          this.appStore.toast = "error"
          this.appStore.toastLabel = `Error on downloading ${item.name}`
        })
        this.appStore.toast = "success"
        this.appStore.toastLabel = `${item.name} downloaded.`
        this.appStore.downloading = null
      }
    },
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
    backButtonListener(() => {
      if (history.length != 1) this.$router.go(-1)
      else exit()
    })

    await this.loadTheme()
    this.hideSplash()
    this.loadBanner()
    listen(this.setProgress)
  },
  async beforeUnmount() {
    await removeListeners()
  },
  computed: {
    downloadQueue() {
      return this.appStore.downloadQueue
    }
  },
  watch: {
    async downloadQueue() {
      if (this.appStore.downloading == null)
        this.downloadItem()
    }
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