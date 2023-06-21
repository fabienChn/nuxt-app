<template>
  <div
    v-if="props.isLiked || !props.isFromAuth"
    class="cursor-pointer absolute top-[80%] bg-white p-1 rounded-2xl right-1 leading-[0] align-middle shadow"
  >
    <font-awesome-icon
      v-if="props.isLiked"
      :icon="['fas', 'heart']"
      style="color: red"
      size="xs"
      border-margin="0"
    />
    <font-awesome-icon
      v-else
      :icon="['fas', 'heart']"
      style="color: red; opacity: 0.2"
      size="xs"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  isLiked: {
    type: Boolean,
    required: true,
  },
  isFromAuth: {
    type: Boolean,
    required: true,
  },
});
</script>
