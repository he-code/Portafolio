<template>
  <section id="contact" class="section" role="region" aria-labelledby="contact-heading">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">// {{ t('contact.label') }}</span>
        <h2 id="contact-heading" class="section-title">{{ t('contact.title') }}</h2>
      </div>
      <div class="contact-grid">
        <div class="contact-info reveal reveal-delay-1">
          <p>{{ t('contact.text') }}</p>
          <p class="contact-availability">
            <span class="status-dot" aria-hidden="true"></span>
            {{ t('contact.available') }}
          </p>

          <div class="contact-cards">
            <a href="mailto:tu@email.com" class="contact-card" aria-label="Enviar correo electrónico">
              <div class="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="contact-card-body">
                <span class="contact-card-label">{{ t('contact.email') }}</span>
                <span class="contact-card-value">tu@email.com</span>
              </div>
              <svg class="contact-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="https://github.com/tuusuario" target="_blank" class="contact-card" aria-label="Perfil de GitHub">
              <div class="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <div class="contact-card-body">
                <span class="contact-card-label">{{ t('contact.github') }}</span>
                <span class="contact-card-value">github.com/tuusuario</span>
              </div>
              <svg class="contact-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="https://linkedin.com/in/tuusuario" target="_blank" class="contact-card" aria-label="Perfil de LinkedIn">
              <div class="contact-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div class="contact-card-body">
                <span class="contact-card-label">{{ t('contact.linkedin') }}</span>
                <span class="contact-card-value">linkedin.com/in/tuusuario</span>
              </div>
              <svg class="contact-card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

        <form class="contact-form reveal reveal-delay-2" @submit.prevent="handleSubmit" aria-label="Formulario de contacto">
          <div class="form-group">
            <label for="contact-name" class="sr-only">{{ t('contact.form_name') }}</label>
            <input v-model="form.name" id="contact-name" :placeholder="t('contact.form_name')" required class="form-input" aria-required="true" />
          </div>
          <div class="form-group">
            <label for="contact-email" class="sr-only">{{ t('contact.form_email') }}</label>
            <input v-model="form.email" id="contact-email" type="email" :placeholder="t('contact.form_email')" required class="form-input" aria-required="true" />
          </div>
          <div class="form-group">
            <label for="contact-message" class="sr-only">{{ t('contact.form_message') }}</label>
            <textarea v-model="form.message" id="contact-message" :placeholder="t('contact.form_message')" rows="5" required class="form-input" aria-required="true"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="sending" aria-busy="sending">
            {{ sending ? t('contact.form_sending') : t('contact.form_send') }}
          </button>
          <p v-if="status" class="form-status" :class="{ success: status === 'ok', error: status === 'error' }" aria-live="polite">
            {{ status === 'ok' ? t('contact.form_success') : t('contact.form_error') }}
          </p>
        </form>
      </div>
    </div>
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} {{ t('hero.name') }}. {{ t('contact.footer') }}</p>
      </div>
    </footer>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from '../composables/useI18n.js'
import { useReveal } from '../composables/useReveal.js'
useReveal()
const { t } = useI18n()

const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const status = ref(null)

async function handleSubmit() {
  sending.value = true
  status.value = null
  try {
    const res = await fetch('https://formspree.io/f/xtuaejzl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      status.value = 'ok'
      form.name = ''
      form.email = ''
      form.message = ''
    } else {
      status.value = 'error'
    }
  } catch {
    status.value = 'error'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info p {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.contact-availability {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.4);
  animation: statusPulse 2s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: all 0.3s ease;
}

.contact-card:hover {
  border-color: var(--accent);
  transform: translateX(4px);
  box-shadow: 0 0 24px var(--accent-glow);
}

.contact-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(99, 102, 241, 0.1);
  color: var(--accent);
  flex-shrink: 0;
}

.contact-card-body { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.contact-card-label { font-size: 0.75rem; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; }
.contact-card-value { font-size: 0.9rem; font-weight: 500; color: var(--text-primary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.contact-card-arrow { color: var(--text-muted); transition: transform 0.3s ease; flex-shrink: 0; }
.contact-card:hover .contact-card-arrow { transform: translateX(4px); color: var(--accent); }

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group { width: 100%; }

.form-input {
  width: 100%;
  padding: 0.9rem 1.1rem;
  font-family: inherit;
  font-size: 0.9rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.form-input::placeholder { color: var(--text-muted); }

textarea.form-input { resize: vertical; min-height: 120px; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.9rem 1.8rem;
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
.btn-primary:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px var(--accent-glow);
}
.btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }

.form-status {
  font-size: 0.85rem;
  text-align: center;
}
.form-status.success { color: #22c55e; }
.form-status.error { color: #ef4444; }

.footer {
  margin-top: 6rem;
  padding: 2rem 0;
  border-top: 1px solid var(--border);
  text-align: center;
}

.footer p { font-size: 0.82rem; color: var(--text-muted); }

@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
</style>
