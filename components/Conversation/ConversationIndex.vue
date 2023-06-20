<template>
  <div>
    <h2 class="title">
      <NuxtLink to="/conversations" class="mr-2">
        {{ `<` }}
      </NuxtLink>
      Messages with {{ interlocutorName }}
    </h2>

    <div class="flex flex-col gap-3 mb-3 pb-3 max-h-[80vh] overflow-y-scroll">
      <conversation-message
        v-for="message in messages"
        :key="message"
        :message="message"
      />
    </div>

    <conversation-message-sender @send-message="sendMessage" />
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const { id } = useRoute().params;

const conversation = await fetchConversation();
const messages = await fetchMessages();

const { $socketioClient } = useNuxtApp();
const { io } = $socketioClient;
const { apiUrl } = useRuntimeConfig().public;
const socket = io(apiUrl, {
  query: {
    token: authStore.token,
  },
  withCredentials: true,
});

socket.on("message", (message) => {
  messages.value.push(message);
});

function sendMessage(inputValue) {
  socket.emit("message", {
    text: inputValue,
    conversationId: id,
  });
}

const interlocutorName = computed(() => {
  const authId = authStore.user?.id;

  return conversation?.value?.users?.find((user) => user?.user_id !== authId)
    ?.user?.name;
});

async function fetchConversation() {
  const { data } = await useRequest(`conversations/${id}`, {
    key: `conversations-${id}`,
  });

  return data;
}

async function fetchMessages() {
  const { data } = await useRequest(`messages/${id}`, {
    key: `messages-${id}`,
  });

  return data;
}
</script>
