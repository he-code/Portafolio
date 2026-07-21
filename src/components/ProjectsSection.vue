<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">// {{ t('projects.label') }}</span>
        <h2 class="section-title">{{ t('projects.title') }}</h2>
      </div>

      <div class="project-filters reveal reveal-delay-1">
        <button
          v-for="f in filters"
          :key="f.key"
          :class="{ active: activeFilter === f.key }"
          @click="activeFilter = f.key"
        >{{ f.label }}</button>
      </div>

      <div class="projects-grid">
        <ProjectCard
          v-for="(project, index) in filtered"
          :key="project.id"
          :project="project"
          :delay="index"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProjectCard from './ProjectCard.vue'
import { projects } from '../data/projects.js'
import { useReveal } from '../composables/useReveal.js'
import { useI18n } from '../composables/useI18n.js'
useReveal()
const { t } = useI18n()

const activeFilter = ref('all')

const filters = computed(() => {
  const tags = [...new Set(projects.flatMap(p => p.tags))]
  return [{ key: 'all', label: t('projects.filter_all') }, ...tags.map(t => ({ key: t, label: t }))]
})

const filtered = computed(() => {
  if (activeFilter.value === 'all') return projects
  return projects.filter(p => p.tags.includes(activeFilter.value))
})
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 1.5rem;
}

.project-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2.5rem;
}

.project-filters button {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s ease;
}

.project-filters button:hover,
.project-filters button.active {
  border-color: var(--accent);
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent);
}
</style>
