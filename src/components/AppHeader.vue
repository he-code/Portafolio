<template>
  <header class="header" :class="{ 'header-scrolled': scrolled }" role="banner">
    <nav class="container header-nav" aria-label="Navegación principal">
      <router-link to="/" class="logo" aria-label="Ir a la página principal">&#60;dev&#47;&#62;</router-link>

      <button
        class="menu-toggle"
        @click="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-controls="main-menu"
        :title="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
      >
        <span class="menu-line" :class="{ open: menuOpen }" aria-hidden="true"></span>
        <span class="menu-line" :class="{ open: menuOpen }" aria-hidden="true"></span>
        <span class="menu-line" :class="{ open: menuOpen }" aria-hidden="true"></span>
      </button>

      <ul class="nav-links" :class="{ 'nav-open': menuOpen }" id="main-menu" role="menubar">
        <li role="none">
          <a href="/#about" @click="menuOpen = false" role="menuitem">{{ t('nav.about') }}</a>
        </li>
        <li role="none">
          <a href="/#projects" @click="menuOpen = false" role="menuitem">{{ t('nav.projects') }}</a>
        </li>
        <li role="none">
          <a href="/#skills" @click="menuOpen = false" role="menuitem">{{ t('nav.skills') }}</a>
        </li>
        <li role="none">
          <a href="/#contact" @click="menuOpen = false" role="menuitem">{{ t('nav.contact') }}</a>
        </li>
        <li class="nav-actions" role="none">
          <button
            class="icon-btn lang-btn"
            @click="setLocale(isES ? 'en' : 'es')"
            :aria-label="isES ? 'Cambiar idioma a inglés' : 'Cambiar idioma a español'"
          >
            {{ isES ? 'EN' : 'ES' }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '../composables/useI18n.js';

const { t, setLocale, isES } = useI18n();

const scrolled = ref(false);
const menuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 40;
}

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.4s ease;
  background: transparent;
}

.header-scrolled {
  background: rgba(8, 8, 12, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
}

.header-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links a {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: color 0.3s;
  position: relative;
  text-decoration: none;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--gradient-1);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.nav-links a:hover {
  color: var(--text-primary);
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: 0.5rem;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s ease;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
}

.icon-btn:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  outline: none;
}

.menu-line {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-line.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}
.menu-line.open:nth-child(2) {
  opacity: 0;
}
.menu-line.open:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

@media (max-width: 640px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    flex-direction: column;
    background: rgba(8, 8, 12, 0.95);
    backdrop-filter: blur(16px);
    padding: 2rem;
    gap: 1.5rem;
    border-bottom: 1px solid var(--border);
    transform: translateY(-120%);
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-links.nav-open {
    transform: translateY(0);
  }
  .nav-links a {
    font-size: 1rem;
  }
  .nav-actions {
    margin-left: 0;
  }
}
</style>
