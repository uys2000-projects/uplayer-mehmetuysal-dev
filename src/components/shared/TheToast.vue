<template>
  <div class="toast bottom-8 right-2" v-if="appStore.toastLabel">
    <div class="alert pr-6" :class="type">
      <span class="material-symbols-outlined cursor-pointer absolute top-4 right-4 rounded-full p-1"
        @click="appStore.cancel">
        cancel
      </span>
      <span class="text-sm">{{ appStore.toastLabel }}</span>
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