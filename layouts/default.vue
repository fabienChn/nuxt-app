<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">Messenger App</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li v-if="authStore.isLoggedIn()">
            <NuxtLink to="/conversations">Conversations</NuxtLink>
          </li>
          <li v-if="!authStore.isLoggedIn()">
            <NuxtLink to="/login">Login</NuxtLink>
          </li>
          <li v-if="!authStore.isLoggedIn()">
            <NuxtLink to="/signup">Signup</NuxtLink>
          </li>
          <li v-if="authStore.isLoggedIn()">
            {{ authStore.user?.name }}
          </li>
          <li v-if="authStore.isLoggedIn()">
            <NuxtLink class="btn cursor-pointer" @click="logout"
              >Logout</NuxtLink
            >
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
const authStore = useAuthStore();

authStore.loadAuth();

function logout() {
  authStore.resetAuth();
  navigateTo("/login");
}
</script>

<style scoped>
.router-link-exact-active {
  color: green;
}
</style>
