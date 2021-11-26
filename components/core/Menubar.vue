<template>
  <div>
    <img src="/logo.svg" />
    <div class="flex flex-col gap-13">
      <NuxtNavItem route-path="/" icon="i-mdi-format-list-bulleted" tooltip-text="items" />
      <NuxtNavItem route-path="/history" icon="i-mdi-replay" tooltip-text="history" />
      <NuxtNavItem route-path="/stats" icon="i-mdi-chart-box-outline" tooltip-text="statistics" />
    </div>
    <div class="flex bg-primary rounded-full p-2">
      <NuxtLink to="/" i-mdi-cart-outline class="text-xl text-white cursor-pointer" />
    </div>
  </div>
</template>
