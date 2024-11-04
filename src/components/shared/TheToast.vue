<template>
  <div class="toast bottom-8 right-2" v-if="appStore.toastLabel">
    <div class="alert pr-6 max-w-[75vw] h-max" :class="type">
      <span class="material-symbols-outlined cursor-pointer absolute top-4 right-4 rounded-full p-1"
        @click="appStore.cancel">
        cancel
      </span>
      <span class="text-sm w-full text-wrap">{{ appStore.toastLabel }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';

export default {
  data() {
    return {
      appStore: useAppStore()
    }
  },
  computed: {
    type() {
      switch (this.appStore.toast) {
        case "info":
          return "alert-info"
        case "success":
          return "alert-success"
        case "warning":
          return "alert-warning"
        case "error":
          return "alert-error"
        default:
          return ""
      }
    },
  }
}
</script>