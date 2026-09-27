<template>
  <section class="section">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">// {{ t('experience.label') }}</span>
        <h2 class="section-title">{{ t('experience.title') }} <span class="gradient-text">⚡</span></h2>
      </div>
      <div class="timeline">
        <div
          v-for="(item, idx) in experience"
          :key="item.id"
          class="timeline-item reveal"
          :class="`reveal-delay-${Math.min(idx + 1, 4)}`"
        >
          <div class="timeline-marker"></div>
          <div class="timeline-card">
            <span class="timeline-period">{{ isES ? item.period : item.periodEn }}</span>
            <h3 class="timeline-title">{{ isES ? item.title : item.titleEn }}</h3>
            <span class="timeline-company">{{ item.company }}</span>
            <p class="timeline-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { experience } from '../data/experience.js';
import { useI18n } from '../composables/useI18n.js';
import { useReveal } from '../composables/useReveal.js';
useReveal();
const { t, isES } = useI18n();
</script>

<style scoped>
.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border);
}

.timeline-item {
  position: relative;
  padding-bottom: 2.5rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: -2rem;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--accent);
  box-shadow: 0 0 12px var(--accent-glow);
}

.timeline-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.timeline-card:hover {
  border-color: var(--border-hover);
  transform: translateX(4px);
  box-shadow: var(--shadow);
}

.timeline-period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--accent);
  font-weight: 500;
}

.timeline-title {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0.3rem 0 0.15rem;
}

.timeline-company {
  font-size: 0.85rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 0.6rem;
}

.timeline-description {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
