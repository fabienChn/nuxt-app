<template>
  <div>
    <header class="shadow-sm bg-white">
      <nav class="container mx-auto p-4 flex justify-between">
        <NuxtLink to="/" class="font-bold">My App</NuxtLink>
        <ul class="flex gap-4">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/blogs">Blogs</NuxtLink></li>
          <li><NuxtLink to="/login">Login</NuxtLink></li>
          <li><NuxtLink to="/signup">Signup</NuxtLink></li>
          <li><NuxtLink to="/logout" class="btn">Logout</NuxtLink></li>
        </ul>
      </nav>
      </header>

      <div class="container mx-auto p-4">
        <slot />
      </div>
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    color: green;
  }
</style>