<template>
  <FormKit
    :type="type"
    :outer-class="outerClass"
    :input-class="inputClass"
    @click="handleClick"
  >
    {{ text }}
  </FormKit>
</template>

<script setup lang="ts">

const props = defineProps({
  text: { type: String, required: true },
  type: { type: String, required: true },
  outerClass: { type: String, required: false },
  inputClass: { type: String, required: true },
  handleClick: { type: Function, required: false },
})

const { text, type, outerClass, inputClass, handleClick } = toRefs(props)

</script>
