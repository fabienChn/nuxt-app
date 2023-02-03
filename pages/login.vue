<template>
  <h2>Login</h2>
  <form @submit.prevent="submit()" class="flex flex-col max-w-md gap-2 mt-4">
    <input 
      name="email" 
      required 
      placeholder="Email" 
      v-model="form.email"
      :class="{'border-red-500': form.errors.email}"
    />
    <div class="text-red-500">{{ form.errors.email }}</div>
    <input 
      type="password" 
      required 
      placeholder="Password"
      :class="{'border-red-500': form.errors.password}"
      v-model="form.password" 
    />
    <div class="text-red-500">{{ form.errors.password }}</div>
    <button type="submit" class="btn">Login</button>
  </form>
</template>

<script setup>
  const form = ref({
    email: 'ninja@gmail.com',
    password: 'test123',
    errors: {},
  });

  function resetErrors() {
    form.value.errors = {};
  }

  async function submit() {
    const { apiUrl } = useRuntimeConfig().public;

    resetErrors();

    const { data } = await useFetch(`${apiUrl}/login`, { 
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
      },
      onResponseError({ response }) {
        form.value.errors = response._data.errors;
      },
    });

    if (data.value?.user) {
      navigateTo('/');
    }
  }
</script>