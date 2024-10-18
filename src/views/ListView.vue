<template>
  <div class="flex flex-col gap-4 p-4 h-full w-full overflow-hidden" :class="{ 'pb-12': appStore.adLoaded }">
    <label class="input input-bordered flex items-center gap-2 flex-shrink-0">
      Name:
      <input type="text" class="grow" v-model="searchName" @change="() => onFilterChange()" />
    </label>
    <label class="input input-bordered flex items-center gap-2 flex-shrink-0">
      Group:
      <input type="text" class="grow" v-model="searchGroup" @change="() => onFilterChange()" />
    </label>
    <div id="scrollArea" class="h-full w-full flex-shrink overflow-auto">
      <div id="contentArea" class="flex overflow-hidden h-max w-full justify-center flex-wrap gap-4">
        <div class="clusterize-no-data">
          <template v-if="!notFound">
            <span class="loading loading-infinity loading-lg"></span>
          </template>
          <template v-else>
            Not Found
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { filterBatcher, mapBatcher } from "@/services/batcher";
import { readFileObject } from "@/services/capacitor/filesystem";
import { useAppStore } from "@/stores/app";
import { usePlaylistStore } from "@/stores/playlist";
import type { UPlayListItem } from "@/types/playlist";
import { CapacitorVideoPlayer } from "capacitor-video-player";
import Clusterize from "clusterize.js";
export default {
  data() {
    return {
      searchName: "",
      searchGroup: "",
      timer: 0,
      active: "",
      index: 0,
      notFound: false,
      appStore: useAppStore(),
      playlistStore: usePlaylistStore(),
      clusterize: null as null | Clusterize,
      playlist: [] as UPlayListItem[]
    };
  },
  methods: {
    async play() {
      await CapacitorVideoPlayer.stopAllPlayers()
      await CapacitorVideoPlayer.initPlayer({
        mode: "fullscreen",
        url: this.src,
        playerId: "player",
        pipEnabled: false,
      })
      CapacitorVideoPlayer.play({ playerId: "player" })
    },
    createClusterize(data: string[]) {
      this.clusterize = new Clusterize({
        rows: data,
        scrollId: "scrollArea",
        contentId: "contentArea",
        callbacks: {
          clusterChanged: () => {
            const items = document.querySelectorAll("#target") as NodeListOf<HTMLDivElement>;
            items.forEach((item) => {
              item.addEventListener("click", () => {
                this.index = Number.parseInt(item.dataset.index as string)
                const watch = item.querySelector(".watch") as HTMLSpanElement
                watch.onclick = () => {
                  if (this.active == index) this.play()
                }
                const i = document.activeElement as HTMLDivElement
                const index = i.dataset.index as string
                if (this.active != index) {
                  this.active = index;
                }
              });
            });
          },
        },
      });
    },
    async loadClusterize() {
      this.playlist = this.playlistStore.playlist
      var data = await mapBatcher(this.playlistStore.playlist, this.getRow)
      if (this.clusterize) this.clusterize.append(data);
      else this.createClusterize(data)
      this.onFilterChange();
    },
    async loadPlaylist() {
      const playlist = (await readFileObject
        .uLog("playlist")
        .catch(() => undefined)) as UPlayListItem[] | undefined;
      if (playlist) {
        this.playlistStore.playlist = playlist;
        this.loadClusterize();
      } else this.notFound = true;
    },
    getRow(item: UPlayListItem, index: number) {
      return `
      <div class="item bg-neutral cursor-pointer relative flex flex-col">
        <img class="w-36 lg:w-52 min-h-8 h-auto m-auto" src="${item.img ? item.img : "/images/404.jpeg"}" alt=""
          loading="lazy">
        <div
          class="absolute glass w-full h-full top-0 left-0 opacity-0 flex flex-col justify-center items-center text-white"
          class="${item.img ? "opacity-100" : ""}">
          <div id="target" data-index="${index}" class="text-neutral px-1 flex flex-col justify-center" tabindex="0" data-index="${item.line}">
            <span class="m-auto">${item.name}</span>
            <div class="flex gap-4 m-auto">
              <a href="${item.url}" target="_BLANK" class="material-symbols-outlined pt-1 py-4 download">download</a>
              <span class="material-symbols-outlined pt-1 py-4 watch">play_arrow</span>
            </div>
          </div>
        </div>
      </div>`;
    },
    async onFilterChange() {
      if (this.timer) clearTimeout(this.timer);
      setTimeout(async () => {
        const filter = (item: UPlayListItem) => {
          if (item.group.toLocaleLowerCase().includes(this.searchGroup) &&
            item.name.toLocaleLowerCase().includes(this.searchName))
            return item
        }
        const hasName = this.searchGroup.trim() != ""
        const hasGroup = this.searchName.trim() != ""
        if (this.clusterize && (hasName || hasGroup)) {
          this.playlist = await filterBatcher(this.playlistStore.playlist, filter)
          this.clusterize.update(await mapBatcher(this.playlist, this.getRow));
        }
        else if (this.clusterize) this.clusterize.update(await mapBatcher(this.playlistStore.playlist, this.getRow));
      }, 1000);
    },
  },
  computed: {
    name() {
      return this.playlist[this.index]?.name || ''
    },
    src() {
      return this.playlist[this.index]?.url || ''
    }
  },
  mounted() {
    this.searchName = this.playlistStore.name
    this.searchGroup = this.playlistStore.group
    if (this.playlistStore.playlist.length == 0) this.loadPlaylist();
    else this.loadClusterize();
  },
  beforeUnmount() {
    this.playlistStore.name = this.searchName
    this.playlistStore.group = this.searchGroup
    if (this.clusterize) this.clusterize.clear();
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
