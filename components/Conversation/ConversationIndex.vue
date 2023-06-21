<template>
  <div>
    <h2 class="title">
      <NuxtLink to="/conversations" class="mr-2">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </NuxtLink>
      Messages with {{ interlocutorName }}
    </h2>

    <div class="flex flex-col gap-3 mb-3 pb-3 max-h-[80vh] overflow-y-scroll">
      <conversation-message
        v-for="message in messages"
        :key="message"
        :message="message"
        @toggle-is-liked="toggleIsLiked(message)"
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

async function toggleIsLiked(message) {
  const { data } = await useRequest(`messages/${message.id}`, {
    method: "PATCH",
    body: {
      isLiked: !message.is_liked,
    },
  });

  Object.assign(
    messages.value,
    messages.value.map((msg) => {
      if (msg.id !== message.id) {
        return msg;
      }

      return {
        ...msg,
        is_liked: data.value.is_liked,
      };
    })
  );
}
</script>
