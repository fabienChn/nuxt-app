<template>
  <div class="card text-center">
    <p>id: {{ props.blog._id }}</p>
    <p class="font-bold text-gray-500 m-4 truncate">{{ props.blog.title }}</p>

    <NuxtLink :to="`/blogs/${props.blog._id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  blog: {
    type: Object,
    required: true,
  },
});
</script>
