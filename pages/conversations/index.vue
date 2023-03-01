<template>
  <div>
    <h2 class="text-xl">Conversations</h2>

    <button class="btn" @click="initUsers">New Conversation</button>

    <div v-for="user in users" :key="user.id" @click="createConversation(user.id)">
      {{ user.id }}: {{ user.name }}
    </div>

    <div v-for="conversation in conversations" :key="conversation.id" @click="navigateToConversation(conversation.id)">
      <p>{{ conversation.id }}</p>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({  
    middleware: 'auth',
  });

  const conversations = await fetchConversations();
  const users = ref();

  async function fetchConversations() {
    const { data } = await useRequest('conversations');
    
    return data;
  }

  async function initUsers() {
    const { data } = await useRequest('users');
    
    users.value = data.value;
  }

  async function createConversation(userId) {
    const { data } = await useRequest('conversations', {
      method: 'POST',
      body: {
        userIds: [userId],
      }
    });

    if (data?.value) {
      navigateToConversation(data?.value?.id);
    }
  }

  function navigateToConversation(conversationId) {
    navigateTo(`/conversations/${conversationId}`);
  }
</script>