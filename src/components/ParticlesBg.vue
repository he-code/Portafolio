<template>
  <canvas ref="canvas" class="particles-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationId = null

onMounted(() => {
  const cvs = canvas.value
  const ctx = cvs.getContext('2d')
  let particles = []
  let mouse = { x: null, y: null, radius: 120 }

  function resize() {
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // Verificar si el dispositivo tiene baja capacidad de renderizado
  const isLowPerformanceDevice = navigator.hardwareConcurrency <= 4 || (window.matchMedia && window.matchMedia('(max-width: 768px)').matches)

  class Particle {
    constructor() {
      this.x = Math.random() * cvs.width
      this.y = Math.random() * cvs.height
      this.size = Math.random() * 2 + 0.5
      this.speedX = (Math.random() - 0.5) * 0.4
      this.speedY = (Math.random() - 0.5) * 0.4
    }
    update() {
      this.x += this.speedX
      this.y += this.speedY
      if (this.x > cvs.width) this.x = 0
      else if (this.x < 0) this.x = cvs.width
      if (this.y > cvs.height) this.y = 0
      else if (this.y < 0) this.y = cvs.height

      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouse.radius) {
        const force = (mouse.radius - dist) / mouse.radius
        const dirX = dx / dist
        const dirY = dy / dist
        this.x -= dirX * force * 1.5
        this.y -= dirY * force * 1.5
      }
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue('--particle-color').trim() || 'rgba(99, 102, 241, 0.3)'
      ctx.fill()
    }
  }

  function init() {
    particles = []
    // Reducir el número de partículas en dispositivos móviles o con baja potencia
    const baseCount = Math.min(Math.floor((cvs.width * cvs.height) / 9000), 80)
    const count = isLowPerformanceDevice ? Math.max(10, Math.floor(baseCount / 2)) : baseCount
    for (let i = 0; i < count; i++) {
      particles.push(new Particle())
    }
  }
  init()

  function animate() {
    ctx.clearRect(0, 0, cvs.width, cvs.height)
    for (let i = 0; i < particles.length; i++) {
      particles[i].update()
      particles[i].draw()
      // Reducir la cantidad de conexiones entre partículas en dispositivos móviles
      if (!isLowPerformanceDevice) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = getComputedStyle(document.documentElement)
              .getPropertyValue('--particle-line').trim() || 'rgba(99, 102, 241, 0.08)'
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
    }
    animationId = requestAnimationFrame(animate)
  }
  animate()

  function onMouse(e) {
    mouse.x = e.x
    mouse.y = e.y
  }
  window.addEventListener('mousemove', onMouse)

  // Detener animación cuando el usuario no está interactuando
  let lastInteractionTime = Date.now()
  const interactionTimeout = 3000 // 3 segundos sin interacción

  function resetInteractionTimer() {
    lastInteractionTime = Date.now()
  }

  window.addEventListener('mousemove', resetInteractionTimer)
  window.addEventListener('touchstart', resetInteractionTimer)
  window.addEventListener('click', resetInteractionTimer)

  // Verificar si el usuario está interactuando cada segundo
  setInterval(() => {
    if (Date.now() - lastInteractionTime > interactionTimeout) {
      // Si no hay interacción durante 3 segundos, pausar la animación
      cancelAnimationFrame(animationId)
      // Reanudar la animación si el usuario vuelve a interactuar
      animationId = requestAnimationFrame(animate)
    }
  }, 1000)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    window.removeEventListener('resize', resize)
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('touchstart', resetInteractionTimer)
    window.removeEventListener('click', resetInteractionTimer)
  })
})
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
