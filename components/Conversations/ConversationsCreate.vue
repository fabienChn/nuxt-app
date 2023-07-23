<template>
  <div>
    <input
      v-model="searchInput"
      class="rounded"
      placeholder="New Conversation"
      @focus="toggleUsers"
      @update:modelValue="toggleUsers"
    />

    <div
      v-for="user in users"
      :key="user.id"
      class="cursor-pointer"
      @click="createConversation(user.id)"
    >
      {{ user.id }}: {{ user.name }}
    </div>
  </div>
</template>

<script setup>
const users = ref();
const searchInput = ref();

const emit = defineEmits(["created"]);

function toggleUsers() {
  initUsers();
}

async function initUsers() {
  // @todo: to fix
  const { data } = await useRequest("users/new-conversation", {
    query: { name: searchInput },
  });

  users.value = data.value;
}

async function createConversation(userId) {
  const { data } = await useRequest("conversations", {
    method: "POST",
    body: {
      userIds: [userId],
    },
  });

  if (data?.value) {
    emit("created", data?.value?.id);
  }
}
</script>
