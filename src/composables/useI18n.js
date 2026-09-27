import { ref, computed } from 'vue';
import es from '../i18n/es.js';
import en from '../i18n/en.js';

const locale = ref(localStorage.getItem('locale') || 'es');
const messages = { es, en };

export function useI18n() {
  function t(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], messages[locale.value]) ?? key;
  }

  function setLocale(lng) {
    locale.value = lng;
    localStorage.setItem('locale', lng);
  }

  const isES = computed(() => locale.value === 'es');

  return { t, locale, setLocale, isES };
}
