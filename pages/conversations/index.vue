<template>
  <div>
    <h2 class="text-xl">Conversations</h2>

    <div v-for="message in messages" :key="message">
      <p>{{ message }}</p>
    </div>

    <input v-model="inputValue" placeholder="message..." @keydown.enter="sendMessage" autofocus />
    <button class="btn" @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
  definePageMeta({  
    middleware: 'auth',
  });

  const { apiUrl } = useRuntimeConfig().public;

  fetchConversations();
  
  const { $socketioClient } = useNuxtApp();

  const inputValue = ref('');
  const messages = ref([
    'Hello',
    'hey',
    'how are you',
    'good and you???',
  ])

  const { io } = $socketioClient;
  const socket = io(apiUrl, { withCredentials: true });

  socket.on('message', (message) => {
    messages.value.push(message);
  });

  function sendMessage() {
    socket.emit('chatMessage', inputValue.value);
    inputValue.value = '';
  }

  async function fetchConversations() {
    const { data: conversations, error } = await useFetch(`${apiUrl}/conversations`, {
      credentials: 'include',
    });
  
    if (error?.value?.statusCode === 401) {
      navigateTo('/login');
    }

    console.log({ conversations });

    return conversations;
  }
</script>