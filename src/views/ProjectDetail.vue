<template>
  <div class="project-detail">
    <div class="container">
      <router-link to="/" class="back-link" aria-label="Volver a la página principal">{{
        t('projects.back')
      }}</router-link>

      <template v-if="project">
        <div class="detail-header reveal">
          <span class="section-label">// {{ t('projects.label') }}</span>
          <h1 class="detail-title" id="project-title">{{ project.title }}</h1>
        </div>

        <div class="detail-content reveal reveal-delay-1">
          <!--
            ============================================================== 
            AGREGAR IMAGEN DEL PROYECTO:
            Coloca la imagen en /public/images/proyecto-{id}.jpg
            y descomenta el bloque de abajo. Asegúrate de que
            project.image tenga la ruta correcta en data/projects.js.
            ============================================================== 
          <div class="detail-image-wrapper" v-if="project.image">
            <img :src="project.image" :alt="project.title" class="detail-image" />
          </div>
          -->
          <div class="detail-placeholder">
            <div class="placeholder-grid">
              <span></span><span></span><span></span> <span></span><span></span><span></span> <span></span><span></span
              ><span></span>
            </div>
          </div>

          <div class="detail-info">
            <p class="detail-description" :aria-label="`Descripción del proyecto: ${project.description}`">
              {{ project.description }}
            </p>

            <div class="detail-tags">
              <span v-for="tag in project.tags" :key="tag" class="tag" :aria-label="`Etiqueta: ${tag}`">{{ tag }}</span>
            </div>

            <div class="detail-links" v-if="project.demo || project.code">
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                class="btn btn-primary"
                aria-label="Ver demo del proyecto"
              >
                {{ t('projects.demo') }}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
              <a
                v-if="project.code"
                :href="project.code"
                target="_blank"
                class="btn btn-outline"
                aria-label="Ver código del proyecto"
              >
                {{ t('projects.code') }}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </template>

      <div v-else class="not-found reveal">
        <h2>{{ t('projects.not_found_title') }}</h2>
        <p>{{ t('projects.not_found_msg') }}</p>
        <router-link to="/" class="btn btn-primary">{{ t('projects.back') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { projects } from '../data/projects.js';
import { useI18n } from '../composables/useI18n.js';
import { useReveal } from '../composables/useReveal.js';
useReveal();
const { t } = useI18n();
const route = useRoute();
const project = computed(() => projects.find(p => p.id === Number(route.params.id)));
</script>

<style scoped>
.project-detail {
  min-height: 100vh;
  padding: 7rem 0 4rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--accent);
}

.detail-title {
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-top: 0.5rem;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.detail-image-wrapper {
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--border);
}

.detail-image {
  width: 100%;
  height: auto;
  display: block;
}

.detail-placeholder {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 2rem;
}

.placeholder-grid span {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: var(--bg-card-hover);
  animation: gridPulse 2s ease-in-out infinite;
}

.placeholder-grid span:nth-child(2) {
  animation-delay: 0.2s;
}
.placeholder-grid span:nth-child(3) {
  animation-delay: 0.4s;
}
.placeholder-grid span:nth-child(4) {
  animation-delay: 0.1s;
}
.placeholder-grid span:nth-child(5) {
  animation-delay: 0.3s;
}
.placeholder-grid span:nth-child(6) {
  animation-delay: 0.5s;
}
.placeholder-grid span:nth-child(7) {
  animation-delay: 0.15s;
}
.placeholder-grid span:nth-child(8) {
  animation-delay: 0.35s;
}
.placeholder-grid span:nth-child(9) {
  animation-delay: 0.55s;
}

@keyframes gridPulse {
  0%,
  100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.detail-description {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.detail-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 0.3rem 0.65rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 4px;
  color: var(--accent);
}

.detail-links {
  display: flex;
  gap: 1rem;
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

.not-found {
  text-align: center;
  padding: 4rem 0;
}

.not-found h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.not-found p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }

  .detail-title {
    font-size: 2rem;
  }
}
</style>
