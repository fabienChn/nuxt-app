<template>
  <div>
    <h2 class="text-xl">Blog {{ id }}</h2>

    <div class="mt-5">
      <BlogDetails :blog="blog" />
    </div>
  </div>
</template>

<script setup>
  const { id } = useRoute().params;

  const { data: blog } = await useFetch(`http://localhost:4000/blogs/${id}`, { key: id });

  if (!blog.value) {
    throw createError({ statusCode: 404, statusMessage: 'Blog not found', fatal: true });
  }
</script>