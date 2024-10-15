import type { UPlayListItem } from "@/types/playlist";
import { defineStore } from "pinia";

export const usePlaylistStore = defineStore("playlist", {
  state() {
    return {
      name: "",
      group: "",
      playlist: [] as UPlayListItem[],
    };
  },
  getters: {},
});
