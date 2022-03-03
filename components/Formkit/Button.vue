<template>
  <FormKit
    :type="type"
    :outer-class="outerClass"
    :input-class="inputClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <div :class="icon" />
    <span>{{ text }}</span>
  </FormKit>
</template>

<script setup lang="ts">

const props = defineProps({
  text: { type: String, required: false },
  icon: { type: String, required: false },
  type: { type: String, default: 'button', required: false },
  outerClass: { type: String, required: false },
  inputClass: { type: String, required: true },
  handleClick: { type: Function, required: false },
  disabled: { type: Boolean, default: false, required: false },
})

const { text, type, outerClass, inputClass, handleClick, disabled } = toRefs(props)

</script>
