<template>
  <div
    :title="title"
    data-test="message"
    class="flex"
    :class="{ 'justify-end': isFromAuth }"
  >
    <div
      class="border-2 p-3 rounded-lg relative"
      :class="{
        'rounded-tl-none': !isFromAuth,
        'rounded-tr-none bg-[green]': isFromAuth,
      }"
    >
      <p>{{ message.text }}</p>
      <conversation-message-like-button :is-liked="message.is_liked" />
    </div>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const { $dayjs } = useNuxtApp();

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

const isFromAuth = computed(() => props.message.user_id === authStore.user?.id);

const title = computed(() =>
  $dayjs(props.message.created_at).format("YYYY-MM-DD HH:mm")
);
</script>
