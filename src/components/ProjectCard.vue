<template>
  <router-link :to="`/proyecto/${project.id}`" class="project-card reveal" :class="`reveal-delay-${Math.min(delay + 1, 4)}`">
    <div class="project-illustration">
      <!--
        ================================================================
        AGREGAR CAPTURA DE PANTALLA DEL PROYECTO:
        Coloca la imagen en /public/images/proyecto-{id}.jpg y
        descomenta el bloque de abajo. Actualiza la ruta en
        src/data/projects.js campo "image".
        ================================================================
      <img :src="project.image" :alt="project.title" class="project-image" />
      -->
      <div class="project-placeholder">
        <div class="placeholder-grid">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="project-overlay">
        <span class="overlay-text">{{ t('projects.view') }}</span>
      </div>
    </div>
    <div class="project-body">
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
    </div>
  </router-link>
</template>

<script setup>
import { useI18n } from '../composables/useI18n.js'
const { t } = useI18n()

defineProps({
  project: { type: Object, required: true },
  delay: { type: Number, default: 0 },
})
</script>

<style scoped>
.project-card {
  display: block;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover {
  transform: translateY(-6px);
  border-color: var(--border-hover);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.project-illustration {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--bg-secondary);
}

.project-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
.project-card:hover .project-image { transform: scale(1.05); }

.project-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 2rem;
}

.placeholder-grid span {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--bg-card-hover);
  animation: gridPulse 2s ease-in-out infinite;
}

.placeholder-grid span:nth-child(2) { animation-delay: 0.2s; }
.placeholder-grid span:nth-child(3) { animation-delay: 0.4s; }
.placeholder-grid span:nth-child(4) { animation-delay: 0.1s; }
.placeholder-grid span:nth-child(5) { animation-delay: 0.3s; }
.placeholder-grid span:nth-child(6) { animation-delay: 0.5s; }

@keyframes gridPulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
}

.project-overlay {
  position: absolute;
  inset: 0;
  background: rgba(8, 8, 12, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .project-overlay { opacity: 1; }

.overlay-text {
  font-size: 0.85rem;
  font-weight: 500;
  color: #fff;
  border-bottom: 1.5px solid var(--accent);
  padding-bottom: 2px;
}

.project-body { padding: 1.5rem; }

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.75rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.25rem 0.55rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 4px;
  color: var(--accent);
}

.project-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
}

.project-description {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
