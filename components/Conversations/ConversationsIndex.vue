<template>
  <div>
    <h2 class="title">Conversations</h2>

    <conversations-create @created="navigateToConversation" />

    <conversations-list @row-click="navigateToConversation" />
  </div>
</template>

<script setup>
function navigateToConversation(conversationId) {
  navigateTo(`/conversations/${conversationId}`);
}
</script>
