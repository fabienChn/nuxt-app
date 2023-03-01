<template>
  <div>
    <h2 class="text-xl">
      Messages with {{ conversation?.users?.filter(user => user.id != getAuth()?.value?.user?.id)[0].name }}
    </h2>

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

  const { getAuth } = useAuth();
  const { id } = useRoute().params;

  const conversation = await fetchConversation();
  const messages = await fetchMessages();
  
  const inputValue = ref('');
  
  const { $socketioClient } = useNuxtApp();
  const { io } = $socketioClient;
  const { apiUrl } = useRuntimeConfig().public;
  const socket = io(apiUrl, { 
    query: {
      token: getAuth()?.value?.token,
    },
    withCredentials: true,
   });

  socket.on('message', (message) => {
    messages.value.push(message);
  });

  function sendMessage() {
    socket.emit('message', {
      text: inputValue.value,
      conversationId: id,
    });
    inputValue.value = '';
  }

  async function fetchConversation() {
    const { data } = await useRequest(`conversations/${id}`, {
      key: id,
    });

    console.log({
      conversation: data.value,
    })
    return data;
  }

  async function fetchMessages() {
    const { data } = await useRequest(`messages/${id}`, {
      key: id,
    });

    console.log({
      messages: data.value,
    })

    return data;
  }
</script>