<template>
  <div class="card text-center">
    <p>id: {{ blog._id }}</p>
    <p class="font-bold text-gray-500 m-4 truncate">{{ blog.title }}</p>
    
    <NuxtLink :to="`/blogs/${blog._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
  const { blog } = defineProps(['blog'])
</script>