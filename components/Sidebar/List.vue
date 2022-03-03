<template v-if="tabSidebar === 'default'">
  <div class="bg-card flex mt-12 px-4 mx-10 rounded-3xl">
    <img src="/source.svg" />
    <div class="flex flex-col pl-4 pt-8">
      <h4 class="text-white text-xl text-medium mb-3">
        Didn’t find what you need ?
      </h4>
      <FormkitButton text="Add item" input-class="btn btn-white" :handle-click="() => emit('hanleEditItem')" />
    </div>
  </div>
  <client-only>
    <div class="flex justify-center items-center w-full h-full px-10">
      <template v-if="isListEmpty">
        <h3>No items</h3>
      </template>
      <template v-else>
        <div class="flex flex-col justify-start w-full h-full mt-20">
          <div class="flex justify-start">
            <h2 class="text-2xl font-semibold">
              {{ list.name || 'Shopping List' }}
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
    <div class="flex justify-center items-center py-6 bg-white w-full mt-auto">
      <template v-if="!list._id">
        <FormKit
          v-model="list.name"
          validation="required"
          :disabled="isListEmpty"
          placeholder="Enter a name"
          outer-class="!mb-0 -mr-6 w-4/6"
          inner-class="!border-0 !py-2 !bg-transparent"
          input-class="input-primary"
        />
        <FormkitButton text="Save" outer-class="!mb-0" input-class="btn btn-primary" :handle-click="handleSaveList" :disabled="isListEmpty" />
      </template>
      <template v-else>
        <FormkitButton text="cancel" input-class="btn" :handle-click="handleCancelList" />
        <FormkitButton text="Complete" type="submit" outer-class="ml-4" input-class="btn btn-secondary" />
      </template>
    </div>
    <template #fallback>
      <div class="i-mdi-loading animate-spin m-auto" />
    </template>
  </client-only>
</template>

<script setup lang="ts">

import type { PiniaCustomStateProperties } from 'pinia'
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '~/stores/sidebarStore'

const emit = defineEmits(['hanleEditItem'])

const sidebarStore = useSidebarStore()
const { removeItemFromList, changePropertyFromItemInList } = sidebarStore
const { getItemListByCats, list, isListEmpty } = storeToRefs(sidebarStore)

const handleSaveList = async() => {
  if (list.value.name) {
    const createdList = await $fetch<PiniaCustomStateProperties['list']>('/api/list/create', { method: 'POST', body: list.value })
    sidebarStore.$patch(state => state.list = createdList)
  }
}

const handleCancelList = async() => {
  const { _id } = list.value
}

</script>
