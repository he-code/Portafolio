<template>
  <section class="hero" role="region" aria-labelledby="hero-heading">
    <div class="container hero-content">
      <div class="hero-text">
        <!--
          ========================================================
          AGREGAR FOTO DE PERFIL:
          Coloca tu imagen en /public/images/perfil.jpg y
          descomenta el bloque de abajo.
          ========================================================
        <div class="hero-avatar-wrapper reveal">
          <div class="hero-avatar-glow"></div>
          <img src="/images/perfil.jpg" alt="Foto de perfil" class="hero-avatar" />
        </div>
        -->
        <div class="reveal">
          <p class="hero-greeting"><span class="accent-bracket">&lt;</span> {{ t('hero.greeting') }} <span class="accent-bracket">&#47;&gt;</span></p>
        </div>
        <h1 id="hero-heading" class="hero-name reveal reveal-delay-1">
          <span class="gradient-text">{{ t('hero.name') }}</span>
        </h1>
        <p class="hero-role reveal reveal-delay-2">
          <span class="typing-text">{{ displayedRole }}</span><span class="cursor" :class="{ 'cursor-hidden': cursorVisible }">|</span>
        </p>
        <p class="hero-description reveal reveal-delay-3">
          {{ t('hero.description') }}
        </p>
        <div class="hero-actions reveal reveal-delay-4">
          <a href="/#projects" class="btn btn-primary" aria-label="Ir a la sección de proyectos">
            {{ t('hero.btn_projects') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="16 10 22 16 16 22"></polyline>
              <line x1="2" y1="16" x2="22" y2="16"></line>
            </svg>
          </a>
          <a href="/#contact" class="btn btn-outline" aria-label="Ir a la sección de contacto">{{ t('hero.btn_contact') }}</a>
        </div>
        <div class="hero-socials reveal reveal-delay-4">
          <a href="https://github.com/tuusuario" target="_blank" class="social-link" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/in/tuusuario" target="_blank" class="social-link" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from '../composables/useI18n.js'

const { t, locale } = useI18n()

const roles = computed(() => [t('hero.role_1'), t('hero.role_2'), t('hero.role_3')])

const displayedRole = ref('')
const cursorVisible = ref(false)

let roleIndex = 0
let charIndex = 0
let isDeleting = false
let timeoutId = null

function typeEffect() {
  const current = roles.value[roleIndex]

  if (isDeleting) {
    displayedRole.value = current.substring(0, charIndex - 1)
    charIndex--
  } else {
    displayedRole.value = current.substring(0, charIndex + 1)
    charIndex++
  }

  cursorVisible.value = false

  let speed = isDeleting ? 40 : 80

  if (!isDeleting && charIndex === current.length) {
    speed = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.value.length
    speed = 500
  }

  timeoutId = setTimeout(typeEffect, speed)
}

function restartType() {
  if (timeoutId) clearTimeout(timeoutId)
  displayedRole.value = ''
  roleIndex = 0
  charIndex = 0
  isDeleting = false
  setTimeout(typeEffect, 300)
}

watch(locale, restartType)

onMounted(() => {
  typeEffect()
  setInterval(() => { cursorVisible.value = !cursorVisible.value }, 500)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 70px;
  position: relative;
}

.hero-content {
  display: flex;
  align-items: center;
}

.hero-text {
  max-width: 680px;
}

.hero-avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin-bottom: 2rem;
}

.hero-avatar-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: var(--gradient-1);
  opacity: 0.6;
  filter: blur(8px);
  animation: pulseGlow 3s ease-in-out infinite;
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.08); }
}

.hero-avatar {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border);
}

.hero-greeting {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.accent-bracket { color: var(--accent); }

.hero-name {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.05;
  margin-bottom: 0.75rem;
}

.hero-role {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  min-height: 1.8rem;
  font-family: var(--font-mono);
}

.cursor {
  display: inline-block;
  color: var(--accent);
  font-weight: 300;
}
.cursor-hidden { opacity: 0; }

.hero-description {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 2.5rem;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.8rem;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  font-family: inherit;
  border: none;
}

.btn-primary {
  background: var(--gradient-1);
  color: #fff;
}
.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px var(--accent-glow);
}

.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border: 1.5px solid var(--border);
}
.btn-outline:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
}

.hero-socials { display: flex; gap: 1rem; }

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: all 0.3s ease;
}
.social-link:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: translateY(-3px);
  box-shadow: 0 0 20px var(--accent-glow);
}

@media (max-width: 640px) {
  .hero-name { font-size: 2.5rem; }
}
</style>
