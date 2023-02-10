<template>
  <form>
    <input class="input" placeholder="title" />
  </form>
</template>

<script setup>
  definePageMeta({  
    middleware: 'auth',
  })
</script>