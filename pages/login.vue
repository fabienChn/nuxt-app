<template>
  <div>
    <h2>Login</h2>
    <form class="flex flex-col max-w-md gap-2 mt-4" @submit.prevent="submit()">
      <input
        v-model="form.email"
        name="email"
        required
        placeholder="Email"
        :class="{ 'border-red-500': form.errors.email }"
      />
      <div class="text-red-500">{{ form.errors.email }}</div>
      <input
        v-model="form.password"
        type="password"
        required
        placeholder="Password"
        :class="{ 'border-red-500': form.errors.password }"
      />
      <div class="text-red-500">{{ form.errors.password }}</div>
      <button type="submit" class="btn">Login</button>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "guest",
});

const form = ref({
  email: "fabien@gmail.com",
  password: "test123",
  errors: {},
});

function resetErrors() {
  form.value.errors = {};
}

async function submit() {
  const authStore = useAuthStore();

  resetErrors();

  const { data } = await useRequest("auth/signin", {
    method: "POST",
    body: {
      email: form.value.email,
      password: form.value.password,
    },
    onResponseError({ response }) {
      form.value.errors = response._data.errors;
    },
  });

  if (data.value?.access_token) {
    await authStore.initAuth(data.value?.access_token);
    navigateTo("/");
  }
}
</script>
