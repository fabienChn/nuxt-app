<template>
  <div class="card">
    <div class="p-7">
      <p>id: {{ props.blog._id }}</p>
      <p class="text-4xl my-7">{{ props.blog.title }}</p>
      <p class="text-xl my-7">{{ props.blog.snippet }}</p>
      <p>created at: {{ props.blog.createdAt }}</p>
      <p>updated at: {{ props.blog.updatedAt }}</p>
      <button class="btn flex">
        <i class="material-icons mr-2">add_shopping_cart</i>
        <span>Add to cart</span>
      </button>
    </div>
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
