<template>
  <div>
    <h2 class="title">Conversations</h2>

    <button class="btn" @click="toggleUsers">
      New Conversation
    </button>

    <div 
      v-for="user in users" 
      :key="user.id" 
      @click="createConversation(user.id)"
      class="cursor-pointer"
    >
      {{ user.id }}: {{ user.name }}
    </div>

    <div class="flex flex-col gap-3 mt-4">
      <div 
        v-for="conversation in conversations" 
        :key="conversation.id" 
        @click="navigateToConversation(conversation.id)"
        class="conversation" 
      >
        {{ conversation.id }} - {{  conversation.users[0].user.name }}
      </div>
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

  function toggleUsers() {
    if (users?.value?.length) {
      users.value = null;

      return;
    }

    initUsers();
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

<style scoped>
.conversation {
  @apply border-2 rounded-lg p-5 cursor-pointer hover:border-orange-200 hover:font-semibold;
}
</style>