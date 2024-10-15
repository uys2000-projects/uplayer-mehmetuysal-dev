<template>
  <div class="drawer lg:drawer-open bg-base-300 text-base-content overflow-hidden">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
      <TheHeader />
      <div class="h-app-page overflow-hidden relative">
        <router-view v-slot="{ Component, route }">
          <transition name="app">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </div>
    <TheDrawer />
    <TheToast />
  </div>
</template>

<script lang="ts">
import TheHeader from '@/components/shared/TheHeader.vue';
import TheDrawer from '@/components/shared/TheDrawer.vue';
import { RouterView } from 'vue-router'
import TheToast from '@/components/shared/TheToast.vue';
export default {
  components: {
    TheHeader,
    TheDrawer,
    TheToast,
    RouterView
  }
}
</script>

<style>
.app-enter-active,
.app-leave-active {
  transition: 0.5s ease;
  position: absolute;
}

.app-enter-from {
  transform: translateX(100vw);
  opacity: 0;

}

.app-leave-to {
  transform: translateX(-100vw);
  opacity: 0;
}
</style>