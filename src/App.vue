<script setup>
import { ref, onMounted } from 'vue'
import LoadingPage from './components/LoadingPage.vue'
import MainPage from './components/MainPage.vue'


const isLoading = ref(true)

onMounted(() => {
  // 模拟数据加载
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
})
</script>

<template>
  <div class="app-container">
    <LoadingPage v-if="isLoading" />
    <MainPage v-else class="main-page" />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  height: 100%;
}

.app-container {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: #f3f4f6;
}

.main-page {
  width: 100%;
  height: 100%;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
