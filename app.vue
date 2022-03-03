<template>
  <main class="grid grid-cols-12 h-full">
    <CoreMenubar class="col-span-1 flex flex-col justify-between items-center py-8 h-100vh overflow-y-auto" />
    <NuxtPage class="col-span-8 bg-[#FAFAFA] px-20 pt-10" />
    <CoreSidebar class="col-span-3 flex flex-col items-center bg-primaryLighter h-100vh" />
  </main>
</template>

<script setup lang="ts">

import { useSidebarStore } from './stores/sidebarStore'

const sidebarStore = useSidebarStore()

watch(() => sidebarStore, (state) => {
  if (sidebarStore.list.items?.length)
    localStorage.setItem('shoppingify-active-list', JSON.stringify(state.list))
})

</script>

<style>
@import '@unocss/reset/tailwind.css';
@import '~/styles/main.scss';
@import '@formkit/themes/genesis/theme.css';
</style>
