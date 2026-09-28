<template>
  <canvas ref="canvas" class="particles-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const canvas = ref(null);
let animationId = null;
let idleInterval = null;
let ctx = null;
let particles = [];
let mouse = { x: null, y: null, radius: 120 };
let paused = false;
let lastInteractionTime = Date.now();
const interactionTimeout = 3000; // 3 segundos sin interacción
// Caché de colores del tema: se calcula una vez por frame en animate()
let particleColorCache = 'rgba(99, 102, 241, 0.3)';
let particleLineCache = 'rgba(99, 102, 241, 0.08)';
let isLowPerformanceDevice = false;

function resize() {
  if (!canvas.value) return;
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;
}

function onMouse(e) {
  // Listener consolidado: actualiza el mouse y el timer de interacción
  mouse.x = e.x;
  mouse.y = e.y;
  resetInteractionTimer();
}

function resetInteractionTimer() {
  lastInteractionTime = Date.now();
  // Reanudar la animación si estaba pausada por inactividad
  if (paused) {
    paused = false;
    animationId = requestAnimationFrame(animate);
  }
}

class Particle {
  constructor() {
    this.x = Math.random() * canvas.value.width;
    this.y = Math.random() * canvas.value.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.value.width) this.x = 0;
    else if (this.x < 0) this.x = canvas.value.width;
    if (this.y > canvas.value.height) this.y = 0;
    else if (this.y < 0) this.y = canvas.value.height;

    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < mouse.radius) {
      const force = (mouse.radius - dist) / mouse.radius;
      const dirX = dx / dist;
      const dirY = dy / dist;
      this.x -= dirX * force * 1.5;
      this.y -= dirY * force * 1.5;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = particleColorCache;
    ctx.fill();
  }
}

function init() {
  particles = [];
  // Reducir el número de partículas en dispositivos móviles o con baja potencia
  const baseCount = Math.min(Math.floor((canvas.value.width * canvas.value.height) / 9000), 80);
  const count = isLowPerformanceDevice ? Math.max(10, Math.floor(baseCount / 2)) : baseCount;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  // Cachear los colores del tema una vez por frame (en vez de por partícula)
  const styles = getComputedStyle(document.documentElement);
  particleColorCache = styles.getPropertyValue('--particle-color').trim() || 'rgba(99, 102, 241, 0.3)';
  particleLineCache = styles.getPropertyValue('--particle-line').trim() || 'rgba(99, 102, 241, 0.08)';
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    // Reducir la cantidad de conexiones entre partículas en dispositivos móviles
    if (!isLowPerformanceDevice) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = particleLineCache;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }
  animationId = requestAnimationFrame(animate);
}

onMounted(() => {
  ctx = canvas.value.getContext('2d');
  // Verificar si el dispositivo tiene baja capacidad de renderizado
  isLowPerformanceDevice =
    navigator.hardwareConcurrency <= 4 || (window.matchMedia && window.matchMedia('(max-width: 768px)').matches);

  resize();
  window.addEventListener('resize', resize);
  init();
  animate();

  window.addEventListener('mousemove', onMouse);
  window.addEventListener('touchstart', resetInteractionTimer);
  window.addEventListener('click', resetInteractionTimer);

  // Pausar de verdad la animación tras 3s sin interacción (no se reanuda hasta nueva interacción)
  idleInterval = setInterval(() => {
    if (!paused && Date.now() - lastInteractionTime > interactionTimeout) {
      paused = true;
      cancelAnimationFrame(animationId);
    }
  }, 1000);
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  clearInterval(idleInterval);
  window.removeEventListener('resize', resize);
  window.removeEventListener('mousemove', onMouse);
  window.removeEventListener('touchstart', resetInteractionTimer);
  window.removeEventListener('click', resetInteractionTimer);
});
</script>

<style scoped>
.particles-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
</style>
