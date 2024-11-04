import type { UPlayListItem } from "@/types/playlist";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state() {
    return {
      adLoaded: false,
      theme: "light",

      toast: "info" as "info" | "success" | "warning" | "error",
      toastLabel: "",
      toastCancel: () => {},
      progress: 0,
      downloading: null as null | UPlayListItem,
      downloadQueue: [] as UPlayListItem[],
    };
  },
  actions: {
    setProgress(bytes: number, contentLength: number) {
      console.log(
        bytes,
        contentLength,
        Math.round((100 * (bytes == 0 ? 1 : bytes)) / contentLength)
      );
      this.progress = Math.round(
        (100 * (bytes == 0 ? 1 : bytes)) / contentLength
      );
    },
    cancel() {
      this.toastLabel = "";
      this.toastCancel();
    },
  },
});
