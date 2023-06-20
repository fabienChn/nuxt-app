<template>
  <div class="flex">
    <input
      v-model="inputValue"
      placeholder="message..."
      autofocus
      class="flex-1 rounded-r-none"
      @keydown.enter="sendMessage"
    />

    <button class="flex-none btn p-3 w-24 rounded-l-none" @click="sendMessage">
      Send
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["sendMessage"]);

const inputValue = ref("");

function sendMessage() {
  emit("sendMessage", inputValue.value);

  inputValue.value = "";
}
</script>
