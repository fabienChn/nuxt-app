<template>
  <div class="flex flex-col gap-3 mt-4">
    <div
      v-for="conversation in conversations"
      :key="conversation.id"
      class="conversation"
      @click="emit('rowClick', conversation.id)"
    >
      {{ conversation.id }} - {{ conversation.users[0].user.name }}
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["rowClick"]);

const conversations = await fetchConversations();

async function fetchConversations() {
  const { data } = await useRequest("conversations");

  return data;
}
</script>

<style scoped>
.conversation {
  @apply border-2 rounded-lg p-5 cursor-pointer hover:border-orange-200 hover:font-semibold;
}
</style>
