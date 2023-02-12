<template>
  <div>
    <h2 class="text-xl">Index</h2>

    <p>This project should become a messaging app.</p>

    <div v-for="message in messages" :key="message">
      <p>{{ message }}</p>
    </div>

    <input v-model="inputValue" placeholder="message..." @keydown.enter="sendMessage" autofocus />
    <button class="btn" @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
  const { apiUrl } = useRuntimeConfig().public;
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
</script>