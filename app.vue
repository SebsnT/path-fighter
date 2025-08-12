<template>
  <div>
    <NuxtLayout>
      <div v-show="showLoader" id="loader" v-cloak>
        <div class="spinner"></div>
        <img class="logo" src="/favicon.ico" alt="Logo" />
      </div>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const showLoader = ref(true)

onMounted(() => {
  requestAnimationFrame(async () => {
    await nextTick()
    setTimeout(() => {
      showLoader.value = false
    }, 100)
  })
})
</script>

<style>
#loader {
  position: fixed;    
  inset: 0;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: opacity 1.5s ease-in-out;
}

/* Spinner ring */
.spinner {
  position: relative;
  width: 8rem;
  height: 8rem;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 1;
}

/* Logo centered inside spinner */
.logo {
  position: absolute;
  width: 3rem;
  height: 3rem;
  user-select: none;
  z-index: 2;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
