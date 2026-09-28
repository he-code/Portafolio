<template>
  <div id="app-root">
    <ParticlesBg />

    <AppHeader />

    <router-view v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </router-view>

    <button v-if="showScrollTop" class="scroll-top" @click="scrollToTop" aria-label="Volver arriba">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useHead } from '@vueuse/head';
import AppHeader from './components/AppHeader.vue';
import ParticlesBg from './components/ParticlesBg.vue';

useHead({
  title: 'Portafolio · Desarrollador Full Stack',
  meta: [
    { name: 'description', content: 'Portafolio profesional de [Tu Nombre] — Desarrollador Full Stack' },
    { name: 'theme-color', content: '#08080c' },
    { property: 'og:title', content: 'Portafolio · Desarrollador Full Stack' },
    { property: 'og:description', content: 'Portafolio profesional de [Tu Nombre] — Desarrollador Full Stack' },
    { property: 'og:type', content: 'website' },
    // AGREGAR IMAGEN: coloca public/images/og-image.jpg (1200x630 recomendado)
    { property: 'og:image', content: '/images/og-image.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});

const showScrollTop = ref(false);

function onScroll() {
  showScrollTop.value = window.scrollY > 400;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.scroll-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(12px);
}

.scroll-top:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 0 24px var(--accent-glow);
}
</style>
