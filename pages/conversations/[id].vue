<template>
  <div>
    <h2 class="text-xl">Messages with {TODO}</h2>

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

  const { id } = useRoute().params;

  fetchMessages();
  

  const inputValue = ref('');
  const messages = ref([
    'Hello',
    'hey',
    'how are you',
    'good and you???',
  ])

  const { $socketioClient } = useNuxtApp();
  const { io } = $socketioClient;
  const { apiUrl } = useRuntimeConfig().public;
  const socket = io(apiUrl, { 
    query: {
      token: getAuthToken(),
    },
    withCredentials: true,
   });

  socket.on('message', (message) => {
    console.log({ message });
    messages.value.push(message);
  });

  function sendMessage() {
    socket.emit('message', {
      text: inputValue.value,
      conversationId: id,
    });
    inputValue.value = '';
  }

  async function fetchMessages() {
    const { data } = await useRequest(`message/${id}`, {
      key: id,
    });

    console.log({ data });

    return data;
  }
</script>