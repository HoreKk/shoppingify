<template>
  <div :class="{ '!bg-white !items-start px-10': tabSidebar !== 'default' }">
    <SidebarList
      v-if="tabSidebar === 'default'"
      @hanleEditItem="hanleEditItem"
    />
    <SidebarEditItem
      v-if="tabSidebar === 'newItem'"
      :formData="formData"
      :newCategory="newCategory"
      :categories="categories"
      @refreshCategories="refreshCategories"
      @handleCleanFormItem="handleCleanFormItem"
    />
    <SidebarViewItem
      v-if="tabSidebar === 'selectedItem'"
      :tabSidebar="tabSidebar"
      @hanleEditItem="hanleEditItem"
    />
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useSidebarStore } from '~/stores/sidebarStore'

const sidebarStore = useSidebarStore()
const { selectedItem } = storeToRefs(sidebarStore)

const { data: categories, refresh: refreshCategories } = await useFetch('/api/category/list')

const tabSidebar = ref('default')
const newCategory = ref('')

const formDataInital = { _id: null, name: '', note: null, image: null, category: null }

const formData = reactive({ ...formDataInital })

const handleCleanFormItem = () => {
  Object.assign(formData, formDataInital)
  newCategory.value = ''
  tabSidebar.value = selectedItem.value ? 'selectedItem' : 'default'
}

const hanleEditItem = () => {
  if (selectedItem.value) {
    Object.assign(formData, { ...selectedItem.value, category: selectedItem.value.category.name })
    newCategory.value = formData.category
  }
  tabSidebar.value = 'newItem'
}

sidebarStore.$subscribe((mutation) => {
  if (mutation.type === 'patch object' && Object.keys(mutation.payload)[0] === 'selectedItem')
    tabSidebar.value = mutation.payload.selectedItem ? 'selectedItem' : 'default'
  handleCleanFormItem()
})

</script>
