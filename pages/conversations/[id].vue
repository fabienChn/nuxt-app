<template>
  <div>
    <h2 class="title">
      <NuxtLink to="/conversations" class="mr-2">
        {{ `<` }}
      </NuxtLink>
      Messages with {{ getInterlocutorName() }}
    </h2>

    <div class="flex flex-col gap-3 mb-3 max-h-[80vh] overflow-y-scroll">
      <div 
        v-for="message in messages" 
        :key="message" 
        :title="useNuxtApp().$dayjs(message.created_at).format('YYYY-MM-DD HH:mm')"
        class="flex"
        :class="{'justify-end': isAuthsMessage(message)}"
      >
        <div 
          class="border-2 p-3 rounded-lg"
          :class="{
            'rounded-tl-none': !isAuthsMessage(message),
            'rounded-tr-none': isAuthsMessage(message),
          }"
        >
          <p>
            {{ message.text }}
            <span v-if="message.is_liked">{{ `<3` }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="flex">
      <input 
        v-model="inputValue" 
        placeholder="message..." 
        @keydown.enter="sendMessage" 
        autofocus
        class="flex-1 rounded-r-none"
      />
  
      <button class="flex-none btn p-3 w-24 rounded-l-none" @click="sendMessage">
        Send
      </button>
    </div>
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

  function isAuthsMessage(message) {
    return message.user_id === useAuth().getAuthUser().id
  }

  function getInterlocutorName() {
    const authId = useAuth().getAuthUser().id;

    return conversation?.value?.users?.find(user => user?.user_id !== authId)?.user?.name;
  }

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