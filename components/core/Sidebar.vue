<template>
  <div :class="{ '!bg-white !items-start px-10': tabSidebar !== 'default' }">
    <template v-if="tabSidebar === 'default'">
      <div class="bg-card flex mt-12 px-4 rounded-3xl w-5/6">
        <img src="/source.svg" />
        <div class="flex flex-col pl-4 pt-8">
          <h4 class="text-white text-xl text-medium">
            Didn’t find what you need ?
          </h4>
          <FormKit type="button" outer-class="pt-3" input-class="!bg-white" @click="tabSidebar = 'newItem'">
            Add item
          </FormKit>
        </div>
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
      <div class="flex justify-center w-full">
        <FormKit
          type="button"
          outer-class="pt-3"
          input-class="!border-transparent !rounded-xl !px-5 !py-4"
          @click="handleCleanFormItem"
        >
          cancel
        </FormKit>
        <FormKit
          type="submit"
          outer-class="pt-3 ml-4"
          input-class="!text-white !bg-primary !border-transparent !rounded-xl !px-5 !py-4"
          @click="handleSubmit"
        >
          Save
        </FormKit>
      </div>
    </template>
    <template v-if="tabSidebar === 'selectedItem'">
      <div class="flex justify-between items-center w-full mt-6">
        <div class="flex items-center text-primary cursor-pointer" @click="handleCloseSelectedItem">
          <div class="i-mdi-arrow-left-thin mr-1" />back
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
      <div class="flex justify-center w-full mt-4">
        <FormKit
          type="button"
          outer-class="pt-3"
          input-class="!border-transparent !font-semibold !rounded-xl !px-5 !py-4"
          @click="handleDeleteSelectedItem"
        >
          delete
        </FormKit>
        <FormKit
          type="submit"
          outer-class="pt-3 ml-4"
          input-class="!text-white !font-semibold !bg-primary !border-transparent !rounded-xl !px-5 !py-4"
        >
          Add to list
        </FormKit>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">

import { useToast } from 'vue-toastification'
import { useSidebarStore } from '~/stores/sidebarStore'

const toast = useToast()
const sidebarStore = useSidebarStore()

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
  tabSidebar.value = sidebarStore.getSelectedItem ? 'selectedItem' : 'default'
}

const handleSubmit = async() => {
  if (Array.isArray(newCategory.value)) newCategory.value = newCategory.value[0]

  let categoryById = categories.value.find(category => category.name === newCategory.value)

  if (!categoryById) {
    const result = await $fetch('/api/category/create', { params: { name: newCategory.value } })
    await refreshCategories()
    categoryById = result
  }

  category.value = categoryById._id

  const itemFormated = await $fetch(`/api/item/${sidebarStore.getSelectedItem ? 'update' : 'create'}`, { params: formData })

  if (itemFormated._id === sidebarStore.getSelectedItem?._id)
    await sidebarStore.$patch(state => state.selectedItem = itemFormated)
  await sidebarStore.$state.refreshListItems()

  handleCleanFormItem()
}

const hanleEditItem = () => {
  Object.assign(formData, { ...sidebarStore.getSelectedItem, category: sidebarStore.getSelectedItem.category.name })
  newCategory.value = formData.category
  tabSidebar.value = 'newItem'
}

const handleCloseSelectedItem = () => {
  sidebarStore.$patch({ selectedItem: null })
  tabSidebar.value = 'default'
}

const handleDeleteSelectedItem = async() => {
  const itemName = sidebarStore.getSelectedItem.name
  try {
    await $fetch('/api/item/delete', { params: sidebarStore.getSelectedItem })
    await sidebarStore.refreshListItems()
    sidebarStore.$patch({ selectedItem: null })
    tabSidebar.value = 'default'
    toast.success(`${itemName} item successfully deleted`)
  }
  catch (e) {
    toast.error(`Error in delete of ${itemName} item`)
  }
}

sidebarStore.$subscribe((mutation) => {
  if (mutation.type === 'patch object' && Object.keys(mutation.payload)[0] === 'selectedItem')
    mutation.payload.selectedItem ? tabSidebar.value = 'selectedItem' : tabSidebar.value = 'default'
  handleCleanFormItem()
})

</script>
