<template>
  <div class="cursor-dot" :class="{ visible: isVisible }" :style="dotStyle" aria-hidden="true"></div>
  <div class="cursor-ring" :class="{ visible: isVisible }" :style="ringStyle" aria-hidden="true"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const pos = ref({ x: 0, y: 0 });
const target = ref({ x: 0, y: 0 });
const isVisible = ref(false);
const isHovering = ref(false);

// Verificar si el dispositivo tiene entrada táctil (como pantallas táctiles)
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

function onMouse(e) {
  target.value = { x: e.clientX, y: e.clientY };
  if (!isVisible.value) isVisible.value = true;
}

function onMouseLeave() {
  isVisible.value = false;
}

function onLinkEnter() {
  isHovering.value = true;
}

function onLinkLeave() {
  isHovering.value = false;
}

const dotStyle = computed(() => ({
  transform: `translate(${pos.value.x}px, ${pos.value.y}px)`,
}));

const ringStyle = computed(() => ({
  transform: `translate(${pos.value.x}px, ${pos.value.y}px) scale(${isHovering.value ? 1.5 : 1})`,
}));

function animate() {
  // Usar una interpolación más suave para dispositivos móviles
  const speed = isTouchDevice() ? 0.08 : 0.15;
  pos.value.x += (target.value.x - pos.value.x) * speed;
  pos.value.y += (target.value.y - pos.value.y) * speed;
  requestAnimationFrame(animate);
}

onMounted(() => {
  // Solo inicializar el cursor si no es un dispositivo táctil
  if (!isTouchDevice()) {
    document.querySelectorAll('a, button, .btn, .project-card, .contact-card, .skill-chip').forEach(el => {
      el.addEventListener('mouseenter', onLinkEnter);
      el.addEventListener('mouseleave', onLinkLeave);
    });
    document.addEventListener('mousemove', onMouse);
    document.addEventListener('mouseleave', onMouseLeave);
    animate();
  }
});

onUnmounted(() => {
  if (!isTouchDevice()) {
    document.removeEventListener('mousemove', onMouse);
    document.removeEventListener('mouseleave', onMouseLeave);
  }
});
</script>

<style scoped>
.cursor-dot,
.cursor-ring {
  position: fixed;
  top: -4px;
  left: -4px;
  pointer-events: none;
  z-index: 9999;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.cursor-dot.visible,
.cursor-ring.visible {
  opacity: 1;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent-glow);
}

.cursor-ring {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
  transition: transform 0.3s ease;
  margin: -16px 0 0 -16px;
}

/* Ocultar el cursor personalizado en dispositivos táctiles */
@media (pointer: coarse) {
  .cursor-dot,
  .cursor-ring {
    display: none;
  }
}

/* Añadir soporte para usuarios que prefieren reducir animaciones */
@media (prefers-reduced-motion: reduce) {
  .cursor-dot,
  .cursor-ring {
    opacity: 0 !important;
    transform: none !important;
    transition: none !important;
  }
}
</style>
