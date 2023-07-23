<template>
  <div>
    <h2 class="title">
      <NuxtLink to="/conversations" class="mr-2">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </NuxtLink>
      Messages with {{ interlocutorName }}
    </h2>

    <div
      ref="messagesContainer"
      class="flex flex-col gap-3 mb-3 pb-3 h-[calc(100vh-210px)] overflow-y-scroll"
    >
      <div v-if="!hasLoadedAllPages" class="flex justify-center">
        <button class="btn mb-10" @click="loadMore()">Load More</button>
      </div>

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
const messagesContainer = ref();
const pagesLoadedCount = ref(1);
const hasLoadedAllPages = ref(false);

const conversation = await fetchConversation();
const messages = await fetchMessages();

if (messages.value?.length < 10) {
  hasLoadedAllPages.value = true;
}

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

  setTimeout(() => {
    scrollMessagesContainerTo(messagesContainer.value.scrollHeight);
  }, 50);
});

function sendMessage(inputValue) {
  socket.emit("message", {
    text: inputValue,
    conversationId: id,
  });
}

setTimeout(() => {
  scrollMessagesContainerTo(messagesContainer.value.scrollHeight);
}, 50);

const interlocutorName = computed(() => {
  const authId = authStore.user?.id;

  return conversation?.value?.users?.find((user) => user?.user_id !== authId)
    ?.user?.name;
});

function scrollMessagesContainerTo(value) {
  messagesContainer.value.scrollTop = value;
}

async function fetchConversation() {
  const { data } = await useRequest(`conversations/${id}`, {
    key: `conversations-${id}`,
  });

  return data;
}

async function fetchMessages(page = 1) {
  const { data } = await useRequest(`messages/${id}`, {
    key: `messages-${id}-${Date.now()}`,
    query: { page },
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

async function loadMore() {
  pagesLoadedCount.value = pagesLoadedCount.value + 1;

  const olderMessages = await fetchMessages(pagesLoadedCount);

  if (olderMessages.value.length === 0) {
    return;
  }

  if (olderMessages.value.length < 10) {
    hasLoadedAllPages.value = true;
  }

  const boxHeightBeforeLoadingOlderMessages =
    messagesContainer.value.scrollHeight;

  messages.value = olderMessages.value.concat(messages.value);

  setTimeout(() => {
    scrollMessagesContainerTo(
      messagesContainer.value.scrollHeight - boxHeightBeforeLoadingOlderMessages
    );
  }, 50);
}
</script>
