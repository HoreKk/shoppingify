<template>
  <div class="flex justify-between items-center w-full mt-6">
    <div class="flex items-center text-primary cursor-pointer" @click="handleCloseSelectedItem">
      <div class="i-mdi-arrow-left-thin mr-1" />
      <span>back</span>
    </div>
    <div class="flex i-mdi-pencil cursor-pointer" @click="emit('hanleEditItem')" />
  </div>
  <img v-if="selectedItem.image" class="h-[250px] w-full mt-10 object-cover rounded-3xl" :src="selectedItem.image" />
  <div v-else class="h-[250px] w-full mt-10 rounded-2xl bg-gray-400" />
  <div class="flex flex-col mt-8">
    <span class="text-disabled">name</span>
    <h4 class="text-2xl font-medium mt-2">
      {{ selectedItem.name }}
    </h4>
  </div>
  <div class="flex flex-col mt-4">
    <span class="text-disabled">category</span>
    <span class="text-lg font-medium mt-2">
      {{ selectedItem.category.name }}
    </span>
  </div>
  <div v-if="selectedItem.note" class="flex flex-col mt-4">
    <span class="text-disabled">note</span>
    <span class="font-medium mt-2">
      {{ selectedItem.note }}
    </span>
  </div>
  <div class="flex justify-center w-full mt-7">
    <FormkitButton text="delete" input-class="btn" :handle-click="handleDeleteSelectedItem" />
    <FormkitButton
      :text="isItemInList(selectedItem._id) ? 'Remove from list' : 'Add to list'"
      outer-class="ml-4"
      input-class="btn btn-primary"
      :handle-click="handleAddItemToList"
    />
  </div>
</template>

<script setup lang="ts">

import { useToast } from 'vue-toastification'
import { useSidebarStore } from '~/stores/sidebarStore'
import { storeToRefs } from 'pinia'

const toast = useToast()
const sidebarStore = useSidebarStore()
const { isItemInList, addItemToList, removeItemFromList } = sidebarStore
const { selectedItem, refreshItems } = storeToRefs(sidebarStore)

const props = defineProps({
  tabSidebar: { type: String, default: '' },
})

const emit = defineEmits(['hanleEditItem'])

const { tabSidebar } = toRefs(props)

const handleAddItemToList = () => {
  const item = selectedItem.value
  isItemInList(item._id) ? removeItemFromList(item) : addItemToList(item)
  handleCloseSelectedItem()
}

const handleCloseSelectedItem = () => {
  sidebarStore.$patch({ selectedItem: null })
  tabSidebar.value = 'default'
}

const handleDeleteSelectedItem = async() => {
  try {
    await $fetch('/api/item/delete', { params: selectedItem.value })
    await refreshItems.value()
    sidebarStore.$patch({ selectedItem: null })
    tabSidebar.value = 'default'
    toast.success('Item successfully deleted')
  }
  catch {
    toast.error('Error in delete of item')
  }
}

</script>