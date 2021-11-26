<template>
  <div v-tooltip.right="{content: tooltipText, offset: [0, 20]}" class="flex items-center">
    <div :class="{'w-[6px] h-10 bg-primary absolute left-0 rounded-r-lg': route.path === routePath}" />
    <NuxtLink :to="routePath" :class="icon" class="text-xl cursor-pointer" />
  </div>
</template>

<script setup lang="ts">

const route = useRoute()

const props = defineProps({
  routePath: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
    required: true,
  },
})

const { routePath, icon, tooltipText } = toRefs(props)

</script>
