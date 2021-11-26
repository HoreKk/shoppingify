<template>
  <div>
    <div class="flex justify-between mb-12">
      <h1 class="text-4xl font-medium w-1/2 leading-40px">
        <span class="text-primary">Shoppingify</span>
        allows you take your shopping list wherever you go
      </h1>
      <FormKit
        v-model="searchItem"
        :delay="250"
        autocomplete="off"
        type="search"
        placeholder="search item"
        outer-class="w-1/2"
      />
    </div>
    <div v-for="category in itemsByCategories" :key="category._id" class="flex flex-col mt-6 mb-12">
      <h4 class="text-2xl">
        {{ category.name }}
      </h4>
      <div class="flex flex-wrap gap-6 mt-4">
        <div
          v-for="item in category.items"
          :key="item._id"
          class="flex border-2 border-transparent justify-between w-2/9 p-3 bg-white rounded-xl cursor-pointer hover:border-primaryLighter"
          @click="sidebarStore.$patch({ selectedItem: item })"
        >
          <span>{{ item.name }}</span>
          <button class="i-mdi-add text-[#C1C1C4] w-6 h-6 hover:text-primary" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useSidebarStore } from '~/stores/sidebarStore'

const sidebarStore = useSidebarStore()
const searchItem = ref('')

const { data: itemsByCategories, refresh: refreshItems } = await useAsyncData(
  'itemList',
  () => $fetch('/api/item/list', { params: { name: searchItem.value } }),
)

sidebarStore.$patch(state => state.refreshListItems = refreshItems)

watch(searchItem, async() => await refreshItems())

</script>
