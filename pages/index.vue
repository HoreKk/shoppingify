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
          :class="{ 'border-primaryLighter': item._id === selectedItem?._id }"
          class="flex border-2 border-transparent justify-between w-2/9 p-3 bg-white rounded-xl cursor-pointer hover:border-primaryLighter"
          @click.capture="sidebarStore.$patch({ selectedItem: item })"
        >
          <span>{{ item.name }}</span>
          <client-only>
            <button
              :class="!isItemInList(item._id) ? 'i-mdi-add' : 'i-mdi-trash'"
              class="text-disabled w-6 h-6 hover:text-primary"
              @click="handleItemToList(item)"
            />
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useSidebarStore } from '~/stores/sidebarStore'

const sidebarStore = useSidebarStore()
const { isItemInList, addItemToList, removeItemFromList } = sidebarStore
const { selectedItem } = storeToRefs(sidebarStore)

const searchItem = ref('')

const { data: itemsByCategories, refresh: refreshItems } = await useAsyncData(
  'itemList',
  () => $fetch('/api/item/list', { params: { name: searchItem.value } }),
)

sidebarStore.$patch(state => state.refreshItems = refreshItems)

const handleItemToList = async(item) => {
  if (isItemInList(item._id))
    removeItemFromList(item)
  else
    addItemToList(item)
  sidebarStore.$patch({ selectedItem: null })
}

watch(searchItem, async() => await refreshItems())

</script>

<style lang="scss">

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
