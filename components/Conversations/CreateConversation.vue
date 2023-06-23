<template>
  <div>
    <button class="btn" @click="toggleUsers">New Conversation</button>

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

const emit = defineEmits(["created"]);

function toggleUsers() {
  if (users?.value?.length) {
    users.value = null;

    return;
  }

  initUsers();
}

async function initUsers() {
  const { data } = await useRequest("users/new-conversation");

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
