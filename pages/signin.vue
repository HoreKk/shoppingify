<template>
  <div>
    <div class="flex flex-col py-5 px-2 gap-5">
      <FormKit v-model="email" type="text" class="w-[15%] border-green-300 focus:border-green-600 rounded-xl border-2 px-5 py-2" />
      <FormKit v-model="firstName" type="text" class="w-[15%] border-green-300 rounded-xl border-2 px-5 py-2" />
      <FormKit v-model="lastName" type="text" class="w-[15%] border-green-300 rounded-xl border-2 px-5 py-2" />
    </div>
    <div v-if="userError" class="text-lg text-red-500">
      {{ userError }}
    </div>
    <button class="bg-green-400 px-3 py-2 rounded-lg" @click.prevent="createUser">
      Create user
    </button>
  </div>
</template>

<script setup lang="ts">

const initialNewUser = {
  email: '',
  firstName: '',
  lastName: '',
}

const newUser = reactive({ ...initialNewUser })
const userError = ref('')

const createUser = async() => {
  userError.value = ''
  if (!Object.values(newUser).every(property => property === null || property === '')) {
    try {
      await $fetch('/api/user/create', { params: newUser })
      Object.assign(newUser, initialNewUser)
    }
    catch (e) { }
  }
  else {
    userError.value = 'Veuillez remplir tous les champs'
  }
}

const { email, firstName, lastName } = toRefs(newUser)

</script>
