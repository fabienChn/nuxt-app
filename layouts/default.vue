<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">My App</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li v-if="getIsLoggedIn()"><NuxtLink to="/conversations">Conversations</NuxtLink></li>
          <li v-if="getIsLoggedIn()"><NuxtLink to="/blogs">Blogs</NuxtLink></li>
          <li v-if="!getIsLoggedIn()"><NuxtLink to="/login">Login</NuxtLink></li>
          <li v-if="!getIsLoggedIn()"><NuxtLink to="/signup">Signup</NuxtLink></li>
          <li v-if="getIsLoggedIn()">
            <NuxtLink @click="logout" class="btn cursor-pointer">Logout</NuxtLink>
          </li>
        </ul>
      </nav>
      </header>

      <div class="container mx-auto p-4">
        <slot />
      </div>
  </div>
</template>

<script setup>
  const { apiUrl } = useRuntimeConfig().public;
  const { getIsLoggedIn, resetAuth } = useAuth();

  async function logout() {
    await useFetch(`${apiUrl}/logout`, { 
      method: 'POST',
    });

    resetAuth();
    navigateTo('/login');
  }
</script>

<style scoped>
  .router-link-exact-active {
    color: green;
  }
</style>