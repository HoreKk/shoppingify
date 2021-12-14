<template>
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
    v-model="tmpNewCategory"
    validation="required"
    label="Category"
    placeholder="Enter an category"
    autocomplete="off"
    outer-class="w-full !border-[#BDBDBD]"
    inner-class="!rounded-lg"
  />
  <FormKit
    v-model="tmpNewCategory"
    type="select"
    multiple
    :options="categories.map(category => category.name)"
    outer-class="w-full !border-[#BDBDBD]"
    inner-class="!rounded-lg"
  />
  <div class="flex justify-center w-full mt-3">
    <FormkitButton text="cancel" input-class="btn" :handle-click="() => emit('handleCleanFormItem')" />
    <FormkitButton text="Save" type="submit" outer-class="ml-4" input-class="btn btn-primary" :handle-click="handleSubmit" />
  </div>
</template>

<script setup lang="ts">

import { useToast } from 'vue-toastification'
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '~/stores/sidebarStore'

const toast = useToast()
const sidebarStore = useSidebarStore()
const { selectedItem, refreshItems } = storeToRefs(sidebarStore)

const props = defineProps({
  formData: { type: Object, required: true },
  newCategory: { type: String, default: '', required: true },
  categories: { type: Object, required: true },
})

const emit = defineEmits(['refreshCategories', 'handleCleanFormItem'])

const { categories, newCategory } = toRefs(props)
const { formData } = toRefs(props)
const { name, note, image, category } = toRefs(formData.value)

const tmpNewCategory = ref(newCategory.value)

const handleSubmit = async() => {
  const typeSubmit = selectedItem.value ? 'update' : 'create'

  if (Array.isArray(tmpNewCategory.value)) tmpNewCategory.value = tmpNewCategory.value[0]

  let categoryById = categories.value.find(category => category.name === tmpNewCategory.value)
  try {
    if (!categoryById) {
      const result = await $fetch('/api/category/create', { params: { name: tmpNewCategory.value } })
      await emit('refreshCategories')
      categoryById = result
    }

    category.value = categoryById._id

    const itemFormated = await $fetch(`/api/item/${typeSubmit}`, { params: formData.value })

    if (itemFormated._id === selectedItem.value?._id)
      await sidebarStore.$patch(state => state.selectedItem = itemFormated)
    await refreshItems.value()

    emit('handleCleanFormItem')
    toast.success(`Item successfully ${typeSubmit}d`)
  }
  catch {
    toast.error(`Error while ${typeSubmit === 'update' ? 'updating' : 'creating'} item`)
  }
}

</script>
