import { ref, watch, onMounted } from 'vue'

const theme = ref('dark')

export function useTheme() {
  function setTheme(val) {
    theme.value = val
    localStorage.setItem('theme', val)
    document.documentElement.setAttribute('data-theme', val)
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      theme.value = saved
    }
    document.documentElement.setAttribute('data-theme', theme.value)
  })

  return { theme, toggleTheme, setTheme }
}
