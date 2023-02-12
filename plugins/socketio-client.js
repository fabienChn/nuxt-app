import socketioClient from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      socketioClient,
    }
  }
});