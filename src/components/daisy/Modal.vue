<template>
  <dialog ref="dialog" :id="id" class="modal">
    <div class="modal-box p-0">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <slot />
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      type: String,
      default: "modal"
    }
  },
  methods: {
    show() {
      const dialog = this.$refs.dialog as HTMLDialogElement
      dialog.showModal()
    },
    close() {
      const dialog = this.$refs.dialog as HTMLDialogElement
      dialog.close()
    }
  }
}
</script>