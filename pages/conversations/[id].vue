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
  const { apiUrl } = useRuntimeConfig().public;

  fetchMessages();
  
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

  async function fetchMessages() {
    const { data, error } = await useFetch(`${apiUrl}/conversations/${id}`, {
      credentials: 'include',
      key: id,
    });
  
    if (error?.value) {
      console.log('ERRORRRR', error?.value?.statusCode);
    }
    
    if (error?.value?.statusCode === 401) {
      console.log(error);
      // navigateTo('/login');
    }

    console.log({ data });

    return data;
  }
</script>