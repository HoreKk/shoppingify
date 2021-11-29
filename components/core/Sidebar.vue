<template>
  <div :class="{ '!bg-white !items-start px-10': tabSidebar !== 'default' }">
    <template v-if="tabSidebar === 'default'">
      <div class="bg-card flex mt-12 px-4 mx-10 rounded-3xl">
        <img src="/source.svg" />
        <div class="flex flex-col pl-4 pt-8">
          <h4 class="text-white text-xl text-medium mb-3">
            Didn’t find what you need ?
          </h4>
          <FormkitButton text="Add item" input-class="btn btn-white" :handle-click="hanleEditItem" />
        </div>
      </div>
      <div class="flex justify-center items-center w-full h-full px-10">
        <template v-if="sidebarStore.isListEmpty">
          <h3>No items</h3>
        </template>
        <template v-else>
          <div class="flex flex-col justify-start w-full h-full mt-20">
            <div class="flex justify-start">
              <h2 class="text-2xl font-semibold">
                {{ list.name }}
              </h2>
            </div>
            <div v-for="cat in getItemListByCats" :key="cat.name">
              <h4 class="text-[#828282] mt-8">
                {{ cat.name }}
              </h4>
              <div v-for="item in cat.items" :key="item._id" class="flex justify-between items-center mt-4">
                <span class="text-lg font-medium line-clamp-1">{{ item.name }}</span>
                <div :class="{ 'bg-white': item.edit }" class="flex items-center rounded-xl h-full">
                  <template v-if="item.edit">
                    <FormkitButton
                      icon="i-mdi-delete-outline"
                      outer-class="!mb-0"
                      input-class="btn btn-primary !px-2.5 !py-3.5 !text-sm"
                      :handle-click="() => removeItemFromList(item)"
                    />
                    <button class="i-mdi-minus w-6 h-6 bg-primary mx-2" @click="changePropertyFromItemInList(item, 'count', 'minus')" />
                  </template>
                  <FormkitButton
                    :text="`${item.count} pcs`"
                    outer-class="!mb-0"
                    input-class="btn-outline !text-sm"
                    :handle-click="() => changePropertyFromItemInList(item, 'edit')"
                  />
                  <template v-if="item.edit">
                    <button class="i-mdi-plus w-6 h-6 bg-primary mx-2" @click="changePropertyFromItemInList(item, 'count', 'add')" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="flex justify-center items-center py-6 bg-white w-full">
        <FormKit
          v-model="sidebarStore.list.name"
          :disabled="sidebarStore.isListEmpty"
          placeholder="Enter a name"
          outer-class="!mb-0 -mr-6 w-4/6"
          inner-class="!py-1 !border-2  border-primary !rounded-xl disabled:!border-red-300"
        />
        <FormkitButton text="Save" outer-class="!mb-0" input-class="btn btn-primary" :disabled="sidebarStore.isListEmpty" />
      </div>
    </template>
    <template v-if="tabSidebar === 'newItem'">
      <h4 class="text-xl mt-10 mb-4">
        {{ formData._id ? 'Edit' : 'Add a new' }} item
      </h4>
      <FormKit
        v-model="name"
        label="Name"
        placeholder="Enter a name"
        validation="required"
        outer-class="w-full !border-[#BDBDBD]"
        inner-class="!rounded-lg"
      />
      <FormKit
        v-model="note"
        type="textarea"
        label="Note (optional)"
        placeholder="Enter a note"
        outer-class="w-full !border-[#BDBDBD]"
        inner-class="!rounded-lg"
      />
      <FormKit
        v-model="image"
        type="url"
        label="Image (optional)"
        validation="url"
        placeholder="Enter an url"
        outer-class="w-full !border-[#BDBDBD]"
        inner-class="!rounded-lg"
      />
      <FormKit
        v-model="newCategory"
        validation="required"
        label="Category"
        placeholder="Enter an category"
        autocomplete="off"
        outer-class="w-full !border-[#BDBDBD]"
        inner-class="!rounded-lg"
        @focusin="showSelectCategory = true"
      />
      <FormKit
        v-if="showSelectCategory"
        v-model="newCategory"
        type="select"
        multiple
        :options="categories.map(category => category.name)"
        outer-class="w-full !border-[#BDBDBD]"
        inner-class="!rounded-lg"
        @focusin="showSelectCategory = true"
        @focusout="showSelectCategory = false"
      />
      <div class="flex justify-center w-full mt-3">
        <FormkitButton text="cancel" input-class="btn" :handle-click="handleCleanFormItem" />
        <FormkitButton text="Save" type="submit" outer-class="ml-4" input-class="btn btn-primary" :handle-click="handleSubmit" />
      </div>
    </template>
    <template v-if="tabSidebar === 'selectedItem'">
      <div class="flex justify-between items-center w-full mt-6">
        <div class="flex items-center text-primary cursor-pointer" @click="handleCloseSelectedItem">
          <div class="i-mdi-arrow-left-thin mr-1" />
          <span>back</span>
        </div>
        <div class="flex i-mdi-pencil cursor-pointer" @click="hanleEditItem" />
      </div>
      <img
        v-if="sidebarStore.selectedItem.image"
        class="h-[250px] w-full mt-10 object-cover rounded-3xl"
        :src="sidebarStore.selectedItem.image"
      />
      <div v-else class="h-[250px] w-full mt-10 rounded-2xl bg-gray-400" />
      <div class="flex flex-col mt-8">
        <span class="text-disabled">name</span>
        <h4 class="text-2xl font-medium mt-2">
          {{ sidebarStore.selectedItem.name }}
        </h4>
      </div>
      <div class="flex flex-col mt-4">
        <span class="text-disabled">category</span>
        <span class="text-lg font-medium mt-2">
          {{ sidebarStore.selectedItem.category.name }}
        </span>
      </div>
      <div v-if="sidebarStore.selectedItem.note" class="flex flex-col mt-4">
        <span class="text-disabled">note</span>
        <span class="font-medium mt-2 line-clamp-6">
          {{ sidebarStore.selectedItem.note }}
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
  </div>
</template>

<script setup lang="ts">

import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '~/stores/sidebarStore'

const toast = useToast()
const sidebarStore = useSidebarStore()
const { isItemInList, addItemToList, removeItemFromList, changePropertyFromItemInList } = sidebarStore
const { selectedItem, list, getItemListByCats } = storeToRefs(sidebarStore)

const { data: categories, refresh: refreshCategories } = await useFetch('/api/category/list')

const tabSidebar = ref('default')
const showSelectCategory = ref(false)
const newCategory = ref('')

const formDataInital = { _id: null, name: '', note: null, image: null, category: null }

const formData = reactive({ ...formDataInital })

const { name, note, image, category } = toRefs(formData)

const handleCleanFormItem = () => {
  Object.assign(formData, formDataInital)
  showSelectCategory.value = false
  newCategory.value = ''
  tabSidebar.value = selectedItem.value ? 'selectedItem' : 'default'
}

const handleSubmit = async() => {
  const typeSubmit = selectedItem.value ? 'update' : 'create'

  if (Array.isArray(newCategory.value)) newCategory.value = newCategory.value[0]

  let categoryById = categories.value.find(category => category.name === newCategory.value)
  try {
    if (!categoryById) {
      const result = await $fetch('/api/category/create', { params: { name: newCategory.value } })
      await refreshCategories()
      categoryById = result
    }

    category.value = categoryById._id

    const itemFormated = await $fetch(`/api/item/${typeSubmit}`, { params: formData })

    if (itemFormated._id === selectedItem.value?._id)
      await sidebarStore.$patch(state => state.selectedItem = itemFormated)
    await sidebarStore.$state.refreshItems()

    handleCleanFormItem()
    toast.success(`Item successfully ${typeSubmit}d`)
  }
  catch (e) {
    toast.error(`Error while ${typeSubmit === 'update' ? 'updating' : 'creating'} item`)
  }
}

const hanleEditItem = () => {
  if (selectedItem.value) {
    Object.assign(formData, { ...selectedItem.value, category: selectedItem.value.category.name })
    newCategory.value = formData.category
  }
  tabSidebar.value = 'newItem'
}

const handleCloseSelectedItem = () => {
  sidebarStore.$patch({ selectedItem: null })
  tabSidebar.value = 'default'
}

const handleDeleteSelectedItem = async() => {
  try {
    await $fetch('/api/item/delete', { params: selectedItem.value })
    await sidebarStore.refreshItems()
    sidebarStore.$patch({ selectedItem: null })
    tabSidebar.value = 'default'
    toast.success('Item successfully deleted')
  }
  catch (e) {
    toast.error('Error in delete of item')
  }
}

const handleAddItemToList = () => {
  const item = selectedItem.value
  isItemInList(item._id) ? removeItemFromList(item) : addItemToList(item)
  handleCloseSelectedItem()
}

sidebarStore.$subscribe((mutation) => {
  if (mutation.type === 'patch object' && Object.keys(mutation.payload)[0] === 'selectedItem')
    mutation.payload.selectedItem ? tabSidebar.value = 'selectedItem' : tabSidebar.value = 'default'
  handleCleanFormItem()
})

</script>
