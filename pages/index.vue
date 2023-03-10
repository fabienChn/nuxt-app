<template>
  <div>
    <h2 class="text-xl">Index</h2>

    <p>This project should become a messaging app.</p>

    <div class="mt-5">
      <div v-if="authStore.isLoggedIn()">
        Welcome {{ authStore.user.name }}!
      </div>
      <div v-if="!authStore.isLoggedIn()">Welcome guest!</div>
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();

authStore.loadAuth();
</script>
