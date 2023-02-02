<template>
  <div class="card">
    <div class="p-7">
      <p>id: {{ blog._id }}</p>
      <p class="text-4xl my-7">{{ blog.title }}</p>
      <p class="text-xl my-7">{{ blog.snippet }}</p>
      <p>created at: {{  blog.createdAt }}</p>
      <p>updated at: {{  blog.updatedAt }}</p>
      <button class="btn flex">
        <i class="material-icons mr-2">add_shopping_cart</i>
        <span>Add to cart</span>
      </button>
    </div>
  </div>
</template>

<script setup>
  const { blog } = defineProps(['blog']);
</script>