<template>
  <div>
    <h2 class="text-xl">Blogs</h2>

    <div class="grid grid-cols-4 gap-5 mt-5">
      <div v-for="blog in blogs" :key="blog._id">
        <BlogCard :blog="blog" />
      </div>
    </div>

    <NuxtLink class="btn" to="/blogs/create">
      Create Post
    </NuxtLink>

  </div>
</template>

<script setup>
  const { apiUrl } = useRuntimeConfig().public;
  const { data: blogs, error } = await useFetch(`${apiUrl}/blogs`);

  if (error.value.statusCode === 401) {
    navigateTo('/signup');
  }
</script>