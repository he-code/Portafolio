<template>
  <section class="section" role="region" aria-labelledby="testimonials-heading">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">// {{ t('testimonials.label') }}</span>
        <h2 id="testimonials-heading" class="section-title">{{ t('testimonials.title') }} <span class="gradient-text">❤</span></h2>
      </div>
      <div class="testimonials-track" ref="track">
        <div
          v-for="t in testimonials"
          :key="t.id"
          class="testimonial-card"
          :class="{ active: current === t.id }"
          @click="current = t.id"
          :role="current === t.id ? 'article' : 'button'"
          :aria-pressed="current === t.id"
          :aria-label="`Testimonio de ${t.name}: ${t.text}`"
        >
          <div class="testimonial-avatar">
            <!-- AGREGAR AVATAR: Coloca /public/images/avatar-{id}.jpg y descomenta:
            <img :src="`/images/avatar-${t.id}.jpg`" :alt="t.name" class="avatar-img" />
            -->
            <div class="avatar-placeholder">{{ t.name.charAt(0) }}</div>
          </div>
          <blockquote class="testimonial-text" :aria-label="`Testimonio: ${t.text}`">"{{ t.text }}"</blockquote>
          <div class="testimonial-author">
            <strong>{{ t.name }}</strong>
            <span>{{ t.role }}</span>
          </div>
        </div>
      </div>
      <div class="testimonial-dots">
        <button
          v-for="t in testimonials"
          :key="t.id"
          :class="{ active: current === t.id }"
          @click="current = t.id"
          :aria-label="`Testimonio ${t.id} de ${testimonials.length}`"
          :aria-current="current === t.id ? 'true' : 'false'"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { testimonials } from '../data/testimonials.js'
import { useI18n } from '../composables/useI18n.js'
import { useReveal } from '../composables/useReveal.js'
useReveal()
const { t } = useI18n()
const current = ref(1)
</script>

<style scoped>
.testimonials-track {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.testimonial-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonial-card:hover,
.testimonial-card.active {
  border-color: var(--accent);
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.3);
}

.testimonial-avatar {
  margin-bottom: 1rem;
}

.avatar-placeholder {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--gradient-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
}

.avatar-img {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-text {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1.2rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
}

.testimonial-author strong {
  font-size: 0.88rem;
  font-weight: 600;
}

.testimonial-author span {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.testimonial-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.testimonial-dots button {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.testimonial-dots button.active {
  background: var(--accent);
  width: 24px;
  border-radius: 4px;
}

@media (min-width: 768px) {
  .testimonial-dots { display: none; }
}
</style>
