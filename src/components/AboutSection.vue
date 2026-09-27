<template>
  <section id="about" class="section" role="region" aria-labelledby="about-heading">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">// {{ t('about.label') }}</span>
        <h2 id="about-heading" class="section-title">{{ t('about.title') }}</h2>
      </div>
      <div class="about-grid">
        <div class="about-text reveal reveal-delay-1">
          <p>{{ t('about.p1') }}</p>
          <p>{{ t('about.p2') }}</p>
          <!--
            ========================================================
            AGREGAR IMAGEN PERSONAL:
            Coloca una imagen en /public/images/about.jpg y
            descomenta el bloque de abajo.
            ========================================================
          <div class="about-image-wrapper">
            <img src="/images/about.jpg" alt="Sobre mí" class="about-image" />
          </div>
          -->
        </div>
        <div class="about-stats reveal reveal-delay-2">
          <div class="stat-card">
            <span class="stat-number gradient-text">3+</span>
            <span class="stat-label">{{ t('about.stat_1') }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-number gradient-text">15+</span>
            <span class="stat-label">{{ t('about.stat_2') }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-number gradient-text">10+</span>
            <span class="stat-label">{{ t('about.stat_3') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n.js';
import { useReveal } from '../composables/useReveal.js';
useReveal();
const { t } = useI18n();
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 4rem;
  align-items: start;
}

.about-text p {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.2rem;
}

.about-image-wrapper {
  margin-top: 2rem;
}

.about-image {
  width: 100%;
  max-width: 400px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
}

.about-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: var(--border-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.stat-number {
  display: block;
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 0.4rem;
}
.stat-label {
  font-size: 0.82rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .about-stats {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .stat-card {
    flex: 1;
    min-width: 140px;
  }
}
</style>
