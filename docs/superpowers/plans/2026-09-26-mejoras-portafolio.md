# Mejoras del Portafolio: Dark-Only, Fixes, SEO y README — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dejar el portafolio en modo solo oscuro, corregir los bugs de partículas/cursor/accesibilidad, mejorar SEO y actualizar el README — cada cambio en su propia rama remota.

**Architecture:** Vue 3 + Vite SPA con composables. Dark-only elimina el sistema de temas (`useTheme`, `[data-theme="light"]`, localStorage). Los fixes son cirugías locales sobre `ParticlesBg.vue`, `CustomCursor.vue`, `ContactSection.vue` y `AppHeader.vue`. SEO añade meta tags + `lang` dinámico + `robots.txt`.

**Tech Stack:** Vue 3 (Composition API), Vite 5, CSS custom properties, vite-plugin-pwa.

**Spec:** Diseño acotado aprobado en chat (sesión 2026-09-26). Decisiones clave: dark-only total (eliminar toggle por completo), commitear el trabajo pendiente a rama propia, incluir fixes + SEO + README.

## Global Constraints

- **Dark-only total:** sin botón toggle, sin bloque `[data-theme="light"]`, sin lógica de `localStorage` de tema; la paleta oscura de `:root` queda como único tema, con los mismos valores exactos actuales (`--bg-primary: #08080c`, etc.).
- **Workflow por tarea (requisito del usuario):** cada tarea = su propia rama desde `main` actualizado → implementar → commit con mensaje convencional → `git push origin <rama>` → merge a `main` con `--no-ff` → `git push origin main`. Nunca commitear dos tareas en la misma rama.
- **Sin dependencias nuevas** (YAGNI). No se añade framework de tests (no existe infraestructura de tests en el proyecto).
- **Verificación:** `npm run build` debe pasar sin errores + `npm run lint` sin errores nuevos + revisión visual en navegador (dark siempre, sin toggle, sin flash).
- **Idioma:** comentarios y copy de UI en español (patrón existente del repo).
- Los archivos con cambios sin commitear NO se tocan hasta completar la Tarea 1.

## Review Focus

- Visitante con `light` guardado en `localStorage`: debe ver el tema oscuro inmediatamente, sin flash claro ni error en consola (test: Tarea 2, paso de verificación).
- Usuario de teclado: el botón hamburguesa debe mostrar anillo de foco visible al navegar con Tab (test: Tarea 5, paso de verificación).
- Móvil / inactividad: tras 3s sin interacción el canvas debe dejar de consumir CPU y reanudarse al volver a mover el mouse; cursor oculto en táctil (test: Tarea 3 y 4, pasos de verificación).
- Cambio de idioma a EN: `<html lang>` debe actualizarse a `en` (test: Tarea 6, paso de verificación).
- Paleta visual: tras dark-only, los colores renderizados deben ser idénticos a los del tema oscuro actual (test: Tarea 2, revisión visual).

---

### Task 1: Commitear trabajo pendiente a rama `feature/accesibilidad-pwa`

**Files:**
- Modify (ya modificados en working tree): `package.json`, `package-lock.json`, `src/assets/styles/main.css`, `src/components/AboutSection.vue`, `src/components/AppHeader.vue`, `src/components/ContactSection.vue`, `src/components/CustomCursor.vue`, `src/components/HeroSection.vue`, `src/components/ParticlesBg.vue`, `src/components/ProjectCard.vue`, `src/components/TestimonialsSection.vue`, `src/views/ProjectDetail.vue`, `vite.config.js`
- Create (untracked): `.eslintrc.js`, `.prettierrc`

**Interfaces:**
- Consumes: nada (estado actual del working tree).
- Produces: working tree limpio; base sobre la que se crean todas las ramas siguientes.

- [ ] **Step 1: Crear rama y commitear todo el trabajo pendiente**

```bash
git checkout -b feature/accesibilidad-pwa
git add -A
git commit -m "feat: mejoras de accesibilidad ARIA, caching PWA y configuración de ESLint/Prettier"
```

- [ ] **Step 2: Verificar build antes de subir**

Run: `npm run build`
Expected: build completa sin errores.

- [ ] **Step 3: Push de la rama y merge a main**

```bash
git push origin feature/accesibilidad-pwa
git checkout main
git merge --no-ff feature/accesibilidad-pwa -m "merge: feature/accesibilidad-pwa"
git push origin main
```

- [ ] **Step 4: Verificar estado limpio**

Run: `git status --short`
Expected: salida vacía (working tree limpio).

---

### Task 2: Solo modo oscuro (`feature/solo-modo-oscuro`)

**Files:**
- Delete: `src/composables/useTheme.js`
- Modify: `src/App.vue:30,35` (quitar import y llamada)
- Modify: `src/components/AppHeader.vue:18-33,45,48,79-81,203-205` (quitar toggle, iconos, import, destructuring y bloques CSS light)
- Modify: `src/assets/styles/main.css:31-48` (quitar bloque `[data-theme="light"]`)
- Modify: `index.html:2` (quitar `data-theme="dark"`)
- Modify: `src/main.js` (añadir limpieza de clave vieja)
- Modify: `README.md:20,26` (actualizar referencias a modo claro)

**Interfaces:**
- Consumes: working tree limpio (Tarea 1).
- Produces: app sin sistema de temas; `localStorage` sin clave `theme`; ningún componente importa `useTheme`.

- [ ] **Step 1: Eliminar el composable y sus usos**

- Eliminar `src/composables/useTheme.js`.
- `src/App.vue`: borrar la línea `import { useTheme } from './composables/useTheme.js'` y la llamada `useTheme()`.
- `src/components/AppHeader.vue`:
  - borrar la línea `import { useTheme } from '../composables/useTheme.js'`;
  - borrar `const { theme, toggleTheme } = useTheme()`;
  - borrar el botón toggle del template (líneas 18–33: `<button class="icon-btn" @click="toggleTheme()"...>` con sus dos `<svg>`, conservando el botón de idioma).

- [ ] **Step 2: Eliminar CSS del tema claro**

- `src/assets/styles/main.css`: borrar el bloque completo `[data-theme="light"] { ... }` (líneas 31–48).
- `src/components/AppHeader.vue`: borrar los bloques `[data-theme="light"] .header-scrolled { ... }` y `[data-theme="light"] .nav-links { ... }`.
- `index.html`: cambiar `<html lang="es" data-theme="dark">` por `<html lang="es">`.

- [ ] **Step 3: Limpieza de clave vieja en main.js**

En `src/main.js`, antes de `app.mount('#app')`, añadir:

```js
// Modo oscuro único: eliminar la preferencia de tema guardada por versiones anteriores
localStorage.removeItem('theme')
```

- [ ] **Step 4: Actualizar README**

En `README.md`: línea 20, cambiar "Diseño oscuro con modo claro, animaciones sutiles" por "Diseño oscuro, animaciones sutiles"; en la tabla de características, reemplazar la fila `🌗 **Modo claro/oscuro** | Toggle con persistencia en localStorage` por `🌑 **Modo oscuro** | Diseño oscuro único, sin toggle`.

- [ ] **Step 5: Verificar build, lint y visual**

Run: `npm run build`
Expected: build sin errores.

Run: `npm run lint`
Expected: sin errores.

Run (servidor dev + navegador): verificar que el fondo es oscuro siempre, que no existe ningún botón de toggle en el header, y que con `localStorage.theme = 'light'` pre-cargado no hay flash claro.

- [ ] **Step 6: Commit, push y merge**

```bash
git checkout -b feature/solo-modo-oscuro
git add -A
git commit -m "feat: modo solo oscuro, eliminar toggle y tema claro"
git push origin feature/solo-modo-oscuro
git checkout main
git merge --no-ff feature/solo-modo-oscuro -m "merge: feature/solo-modo-oscuro"
git push origin main
```

---

### Task 3: Fix partículas — pausa real y rendimiento (`fix/particulas-pausa-rendimiento`)

**Files:**
- Modify: `src/components/ParticlesBg.vue:57-58,74-127`

**Interfaces:**
- Consumes: working tree limpio.
- Produces: canvas con pausa real por inactividad (flag `paused`), colores cacheados por frame, listeners consolidados, `setInterval` limpiado en `onUnmounted`.

- [ ] **Step 1: Cachear colores de tema fuera del loop por partícula**

Reemplazar los `getComputedStyle(...)` dentro de `draw()` y del bucle de conexiones por dos variables cacheadas calculadas una vez por frame al inicio de `animate()`:

```js
function animate() {
  const styles = getComputedStyle(document.documentElement)
  const particleColor = styles.getPropertyValue('--particle-color').trim() || 'rgba(99, 102, 241, 0.3)'
  const particleLine = styles.getPropertyValue('--particle-line').trim() || 'rgba(99, 102, 241, 0.08)'
  ctx.clearRect(0, 0, cvs.width, cvs.height)
  // draw() usa ctx.fillStyle = particleColor ; conexiones usan ctx.strokeStyle = particleLine
```

(Ajustar `draw()` y el bucle de conexiones para usar esas variables en vez de llamar `getComputedStyle` por partícula.)

- [ ] **Step 2: Pausa real por inactividad**

Reemplazar el bloque roto del `setInterval` (líneas 107–127) por un flag `paused` que cancela el rAF y NO lo reanuda hasta que haya interacción:

```js
// Detener la animación tras 3s sin interacción; reanudar al volver a interactuar
let paused = false
const idleInterval = setInterval(() => {
  if (!paused && Date.now() - lastInteractionTime > interactionTimeout) {
    paused = true
    cancelAnimationFrame(animationId)
  }
}, 1000)

function resetInteractionTimer() {
  lastInteractionTimer = Date.now()
  if (paused) {
    paused = false
    animationId = requestAnimationFrame(animate)
  }
}
```

- [ ] **Step 3: Consolidar listeners y limpiar en onUnmounted**

- Fusionar los dos listeners de `mousemove` en uno: `onMouse` llama también a `resetInteractionTimer()`.
- Mover `onUnmounted` fuera de `onMounted` (al nivel del `<script setup>`), añadiendo `clearInterval(idleInterval)` y la remoción del listener consolidado.

- [ ] **Step 4: Verificar build, lint y visual**

Run: `npm run build`
Expected: build sin errores.

Run: `npm run lint`
Expected: sin errores.

Run (navegador): verificar en DevTools que tras 3s sin mover el mouse el canvas deja de repintar (framerate del rAF en 0) y que al mover el mouse se reanuda; partículas se ven igual que antes.

- [ ] **Step 5: Commit, push y merge**

```bash
git checkout -b fix/particulas-pausa-rendimiento
git add -A
git commit -m "fix: pausa real de partículas por inactividad y caché de colores por frame"
git push origin fix/particulas-pausa-rendimiento
git checkout main
git merge --no-ff fix/particulas-pausa-rendimiento -m "merge: fix/particulas-pausa-rendimiento"
git push origin main
```

---

### Task 4: Fix cursor — delegación de eventos y limpieza (`fix/cursor-delegacion-eventos`)

**Files:**
- Modify: `src/components/CustomCursor.vue:8,52-70`

**Interfaces:**
- Consumes: working tree limpio.
- Produces: cursor con listeners a nivel `document` (delegación), cubre elementos de cualquier página SPA, `animationId` cancelado en `onUnmounted`.

- [ ] **Step 1: Reemplazar listeners por elemento con delegación**

Eliminar el `document.querySelectorAll(...).forEach(...)` de `onMounted` y registrar dos listeners delegados en `document`:

```js
const HOVER_SELECTOR = 'a, button, .btn, .project-card, .contact-card, .skill-chip'

function onMouseOver(e) {
  if (e.target.closest(HOVER_SELECTOR)) isHovering.value = true
}

function onMouseOut(e) {
  if (e.target.closest(HOVER_SELECTOR)) isHovering.value = false
}
```

- [ ] **Step 2: Guardar y cancelar el rAF**

- Declarar `let animationId = null` a nivel del `<script setup>`; asignarlo en `animate()`: `animationId = requestAnimationFrame(animate)`.
- En `onUnmounted`: remover los 4 listeners (`mousemove`, `mouseleave`, `mouseover`, `mouseout`) y llamar `cancelAnimationFrame(animationId)`.

- [ ] **Step 3: Verificar build, lint y visual**

Run: `npm run build`
Expected: build sin errores.

Run: `npm run lint`
Expected: sin errores.

Run (navegador): navegar de Home a `/proyecto/:id` y volver; el anillo del cursor debe reaccionar también sobre los elementos de la página de detalle; no deben acumularse listeners (comprobar con DevTools → getEventListeners opcional).

- [ ] **Step 4: Commit, push y merge**

```bash
git checkout -b fix/cursor-delegacion-eventos
git add -A
git commit -m "fix: cursor con delegación de eventos y cancelación de rAF al desmontar"
git push origin fix/cursor-delegacion-eventos
git checkout main
git merge --no-ff fix/cursor-delegacion-eventos -m "merge: fix/cursor-delegacion-eventos"
git push origin main
```

---

### Task 5: Fix accesibilidad — aria-busy y foco visible (`fix/accesibilidad-aria-foco`)

**Files:**
- Modify: `src/components/ContactSection.vue:79`
- Modify: `src/components/AppHeader.vue:169`

**Interfaces:**
- Consumes: working tree limpio.
- Produces: `aria-busy` con valor válido (`true`/`false`); `.menu-toggle` con estilo `:focus-visible` propio.

- [ ] **Step 1: Corregir aria-busy en el formulario**

En `ContactSection.vue` línea 79, cambiar `aria-busy="sending"` (string literal) por binding reactivo:

```html
:aria-busy="sending ? 'true' : 'false'"
```

- [ ] **Step 2: Restaurar foco visible del botón hamburguesa**

En `AppHeader.vue`, eliminar `outline: none;` del selector `.menu-toggle` y añadir:

```css
.menu-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

- [ ] **Step 3: Verificar build, lint y visual**

Run: `npm run build`
Expected: build sin errores.

Run: `npm run lint`
Expected: sin errores.

Run (navegador): con vista móvil (≤640px), navegar con Tab y verificar que el botón hamburguesa muestra anillo de foco; al enviar el formulario, el botón debe exponer `aria-busy="true"` (DevTools).

- [ ] **Step 4: Commit, push y merge**

```bash
git checkout -b fix/accesibilidad-aria-foco
git add -A
git commit -m "fix: aria-busy reactivo y foco visible en botón hamburguesa"
git push origin fix/accesibilidad-aria-foco
git checkout main
git merge --no-ff fix/accesibilidad-aria-foco -m "merge: fix/accesibilidad-aria-foco"
git push origin main
```

---

### Task 6: SEO — meta tags, lang dinámico y robots.txt (`feature/seo-meta-tags`)

**Files:**
- Modify: `src/App.vue:37-46` (og:image + twitter:card)
- Modify: `src/composables/useI18n.js:13-16` (lang dinámico)
- Create: `public/robots.txt`

**Interfaces:**
- Consumes: working tree limpio.
- Produces: `useHead` con `og:image` y `twitter:card`; `document.documentElement.lang` sincronizado con el locale activo; `/robots.txt` servido por Vite desde `public/`.

- [ ] **Step 1: Añadir og:image y twitter:card en App.vue**

En el array `meta` de `useHead`, añadir (la imagen es placeholder — el usuario debe colocar `public/images/og-image.jpg`):

```js
{ property: 'og:image', content: '/images/og-image.jpg' },
{ name: 'twitter:card', content: 'summary_large_image' },
```

- [ ] **Step 2: Sincronizar <html lang> con el idioma**

En `src/composables/useI18n.js`: tras crear el ref `locale`, inicializar el atributo y actualizarlo en `setLocale`:

```js
document.documentElement.setAttribute('lang', locale.value)

function setLocale(lng) {
  locale.value = lng
  localStorage.setItem('locale', lng)
  document.documentElement.setAttribute('lang', lng)
}
```

- [ ] **Step 3: Crear robots.txt**

Crear `public/robots.txt`:

```
User-agent: *
Allow: /
```

- [ ] **Step 4: Verificar build, lint y visual**

Run: `npm run build`
Expected: build sin errores.

Run: `npm run lint`
Expected: sin errores.

Run (navegador): cambiar idioma a EN y verificar que `<html lang="en">` (DevTools); verificar que `/robots.txt` responde y que el HTML renderizado incluye `og:image` y `twitter:card`.

- [ ] **Step 5: Commit, push y merge**

```bash
git checkout -b feature/seo-meta-tags
git add -A
git commit -m "feat: meta tags Open Graph/Twitter, lang dinámico y robots.txt"
git push origin feature/seo-meta-tags
git checkout main
git merge --no-ff feature/seo-meta-tags -m "merge: feature/seo-meta-tags"
git push origin main
```

---

### Task 7: README actualizado (`feature/readme-actualizar`)

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: working tree limpio; estado final de las Tareas 2 y 6.
- Produces: README coherente con dark-only, lint/format documentados y lista de imágenes pendientes actualizada.

- [ ] **Step 1: Actualizar contenido del README**

- Comandos: añadir `npm run lint`, `npm run lint:fix` y `npm run format` con comentarios.
- Imágenes pendientes: añadir `/public/images/og-image.jpg` — Imagen para Open Graph (compartidos en redes).
- Estructura del proyecto: añadir `.eslintrc.js` y `.prettierrc` al listado.
- Verificar que no quede ninguna referencia a "modo claro" o toggle de tema (la fila de características ya se actualizó en la Tarea 2).

- [ ] **Step 2: Verificar render del markdown**

Run: lectura visual del README
Expected: tablas y bloques de código bien formados.

- [ ] **Step 3: Commit, push y merge**

```bash
git checkout -b feature/readme-actualizar
git add README.md
git commit -m "docs: actualizar README con dark-only, comandos de lint y og-image pendiente"
git push origin feature/readme-actualizar
git checkout main
git merge --no-ff feature/readme-actualizar -m "merge: feature/readme-actualizar"
git push origin main
```

---

## Resumen de ramas

| # | Rama | Tipo | Cambio |
|---|------|------|--------|
| 1 | `feature/accesibilidad-pwa` | feature | Commit del trabajo pendiente (ARIA, PWA caching, ESLint/Prettier) |
| 2 | `feature/solo-modo-oscuro` | feature | Dark-only total, sin toggle |
| 3 | `fix/particulas-pausa-rendimiento` | fix | Pausa real + caché de colores |
| 4 | `fix/cursor-delegacion-eventos` | fix | Delegación de eventos + cancelar rAF |
| 5 | `fix/accesibilidad-aria-foco` | fix | aria-busy + foco visible |
| 6 | `feature/seo-meta-tags` | feature | og:image, twitter:card, lang dinámico, robots.txt |
| 7 | `feature/readme-actualizar` | feature | README coherente con el estado final |
