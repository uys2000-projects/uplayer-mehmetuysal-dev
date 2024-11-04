<template>
  <div class="flex flex-col gap-4 p-4 h-full w-full overflow-hidden" :class="{ 'pb-12': appStore.adLoaded }">
    <div class="flex flex-col gap-4 wide:flex-nowrap wide:flex-row">
      <label class="input input-bordered flex items-center gap-2 flex-shrink-0 wide:flex-shrink">
        Name:
        <input type="text" class="grow" v-model="searchName" @input="() => onFilterChange()" />
      </label>
      <select class="select select-bordered w-full flex-shrink-0 wide:flex-shrink" placeholder="Select Group"
        v-model="searchGroup" @change="() => onFilterChange()">
        <option value="all" selected>All Groups</option>
        <template v-for="group in groups">
          <option :value="group">{{ group }}</option>
        </template>
      </select>
    </div>
    <RecycleScroller class="scroller" :items="playlist" :item-size="96" key-field="line" v-slot="{ item }">
      <div class="h-[96px] p-1 overflow-hidden">
        <div class="h-full flex items-center gap-4 overflow-hidden border border-neutral rounded-box">
          <div class="h-full w-24 flex overflow-hidden relative flex-shrink-0">
            <template v-if="item.img">
              <img class="h-full w-auto m-auto cursor-pointer" :src="item.img" alt="" :key="item.line" loading="lazy"
                @click="() => openImage(item.img)">
            </template>
            <template v-else>
              <img class="h-full w-auto m-auto" src="/images/404.jpeg" alt="" :key="item.line" loading="lazy">
            </template>
          </div>
          <div class="break-words w-full flex-shrink overflow-hidden">
            {{ item.name }}
          </div>
          <div class="mr-2 flex gap-1">
            <span v-if="!isChannelUrl(item.url)" class="material-symbols-outlined cursor-pointer select-none"
              @click="() => addDownloadQueue(item)">
              output_circle
            </span>
            <a class="material-symbols-outlined cursor-pointer select-none" :href="item.url" target="_BLANK">
              download
            </a>
            <span class="material-symbols-outlined cursor-pointer select-none" @click="() => play(item.url)">
              play_arrow
            </span>
          </div>
        </div>
      </div>
    </RecycleScroller>

    <dialog id="modal" class="modal">
      <div class="modal-box">
        <img :src="image" alt="">
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts">
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { filterBatcher } from "@/services/batcher";
import { readFileObject } from "@/services/capacitor/filesystem";
import { useAppStore } from "@/stores/app";
import { usePlaylistStore } from "@/stores/playlist";
import type { UPlayListItem } from "@/types/playlist";
import { CapacitorVideoPlayer } from "capacitor-video-player";
import { RecycleScroller } from 'vue-virtual-scroller'

export default {
  components: { RecycleScroller },
  data() {
    return {
      searchName: "",
      searchGroup: "all",
      timer: 0,
      notFound: false,
      appStore: useAppStore(),
      playlistStore: usePlaylistStore(),
      playlist: [] as UPlayListItem[],
      image: ""
    };
  },
  methods: {
    isChannelUrl(url: string) {
      return url.search(/[.][^.\/]*$/) == -1;
    },
    openImage(image: string) {
      this.image = image
      const dialog = document.querySelector("#modal") as HTMLDialogElement
      dialog.show()
    },
    async play(src: string) {
      await CapacitorVideoPlayer.stopAllPlayers()
      await CapacitorVideoPlayer.initPlayer({
        mode: "fullscreen",
        url: src,
        playerId: "player",
        pipEnabled: false,
      })
      CapacitorVideoPlayer.play({ playerId: "player" })
    },
    async loadPlaylist() {
      const playlist = (await readFileObject
        .uLog("playlist")
        .catch(() => undefined)) as UPlayListItem[] | undefined;
      if (!playlist) return this.notFound = true;
      this.playlistStore.playlist = playlist;
      this.playlist = this.playlistStore.playlist
    },
    async onFilterChange() {
      if (this.timer) clearTimeout(this.timer);
      setTimeout(async () => {
        if (this.searchGroup.trim() != "" || this.searchName.trim() != "") {
          this.playlist = await filterBatcher(this.playlistStore.playlist, item => {
            const isAll = this.searchGroup == "all"
            const isSelectedGroup = this.searchGroup == item.group
            const isSearchNameIncluded = item.name.toLocaleLowerCase().includes(this.searchName.toLocaleLowerCase())
            if ((isAll || isSelectedGroup) && isSearchNameIncluded) return item
            return undefined
          })
        }
      }, 1000);
    },
    addDownloadQueue(item: UPlayListItem) {
      // set downloadQueue with concat to catch change on AppVue file
      if (!this.appStore.downloadQueue.find(i => i.url == item.url)) {
        this.appStore.toast = "info"
        this.appStore.toastLabel = `${item.name} added to queue.`
        this.appStore.downloadQueue = this.appStore.downloadQueue.concat([item])
      }
    }
  },
  computed: {
    groups() {
      const groups = [... new Set(this.playlistStore.playlist.map(i => i.group))]
      return groups
    },
  },
  mounted() {
    this.searchName = this.playlistStore.name
    this.searchGroup = this.playlistStore.group
    if (this.playlistStore.playlist.length == 0) this.loadPlaylist();
    else this.playlist = this.playlistStore.playlist
    this.onFilterChange()
  },
  beforeUnmount() {
    this.playlistStore.name = this.searchName
    this.playlistStore.group = this.searchGroup
  },
};
</script>

<style>
.item:hover .glass {
  @apply opacity-100;
}

.item:hover * {
  @apply text-black;
}
</style>
