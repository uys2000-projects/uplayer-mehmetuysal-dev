<template>
  <div class="-mt-[80px]">
    <div class="hero h-screen w-screen bg-black bg-contain bg-no-repeat" style="background-image: url(/logo.jpg);">
      <div class="hero-overlay bg-opacity-40"></div>
      <div class="hero-content text-neutral-content text-center flex-col">
        <p class="alert alert-info w-full flex">
          <span>
            For more, you can visit <a class="link" href="https://mehmetuysal.dev">mehmetuysal.dev</a>
          </span>
        </p>
        <div class="alert alert-warning block">
          To ensure smooth downloads, please avoid putting the app in the background for an extended period. If you do,
          Android may stop the download process. For the best experience, keep the app open while downloading.
          <span class="italic inline">You can still put the app in the background for short periods if needed.</span>
        </div>

        <div class="alert flex flex-col">
          <div class="flex justify-between gap-1 w-full">
            <span>
              Download in Order:
            </span>
            <span class="material-symbols-outlined">
              output_circle
            </span>
          </div>
          <div class="flex justify-between gap-1 w-full">
            <span>
              Download:
            </span>
            <span class="material-symbols-outlined">
              download
            </span>
          </div>
          <div class="flex justify-between gap-1 w-full">
            <span>
              Play:
            </span>
            <span class="material-symbols-outlined">
              play_arrow
            </span>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
