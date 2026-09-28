<div align="center">
  <br />
  <img src="public/images/favicon.svg" alt="Logo" width="60" />
  <h1>Portafolio</h1>
  <p>
    <strong>Portafolio profesional minimalista · Full Stack Developer</strong>
  </p>
  <p>
    <a href="#-características">Características</a> •
    <a href="#-stack-tecnológico">Stack</a> •
    <a href="#-personalización">Personalización</a> •
    <a href="#-despliegue">Despliegue</a> •
    <a href="#-comandos">Comandos</a>
  </p>
  <br />
</div>

---

Portafolio web construido con **Vue.js 3 + Vite**. Diseño oscuro, animaciones sutiles, partículas interactivas y PWA lista para instalar.

## ✨ Características

| | |
|---|---|
| 🌑 **Modo oscuro** | Diseño oscuro único, sin toggle |
| 🌐 **i18n** | Español e inglés completos, cambio en un clic |
| 🧩 **Partículas interactivas** | Fondo animado que reacciona al mouse |
| 🖱️ **Cursor personalizado** | Efecto magnético en enlaces y botones |
| 🏗️ **Vue Router** | Página de detalle individual para cada proyecto (`/proyecto/:id`) |
| 🔍 **Filtro de proyectos** | Por tags tecnológicos (Vue.js, React, Node.js…) |
| 📱 **Responsive** | Adaptado a móviles con menú hamburguesa |
| ⚡ **PWA** | Service worker generado con `vite-plugin-pwa`, instalable como app |
| 🎞️ **Animaciones al scroll** | IntersectionObserver con fade-in progresivo |
| ✍️ **Efecto de typing** | En el hero con multi-rol e i18n |
| 📬 **Formulario de contacto** | Funcional vía Formspree (sin backend) |
| 📈 **SEO** | Meta tags Open Graph con `@vueuse/head` |
| 🧪 **Timeline** | Sección de experiencia laboral con diseño cronológico |
| 💬 **Testimonios** | Sección con cards interactivas |

## 🛠 Stack tecnológico

| Frontend | Backend | Herramientas |
|---|---|---|
| Vue.js 3 (Composition API) | Node.js (conceptos) | Git |
| Vite | Python (conceptos) | VS Code |
| Vue Router 4 | REST APIs | Figma |
| CSS3 (custom properties) | — | — |

## 📁 Estructura del proyecto

```
Portafolio/
├── public/images/          # Imágenes estáticas (favicon, capturas)
├── src/
│   ├── assets/styles/      # Estilos globales (CSS custom properties)
│   ├── components/         # Componentes Vue (Hero, About, Skills…)
│   ├── composables/        # Composables (useI18n, useReveal)
│   ├── data/               # Datos estáticos (projects, testimonials, experience)
│   ├── i18n/               # Traducciones ES/EN
│   ├── router/             # Configuración de Vue Router
│   └── views/              # Páginas (Home, ProjectDetail)
├── index.html
├── eslint.config.js        # ESLint 9 (flat config)
├── .prettierrc             # Configuración de Prettier
├── package.json
├── vite.config.js          # Vite + PWA plugin
└── .gitignore
```

## 🎨 Personalización

### Datos personales
Edita los textos en `src/data/` y `src/i18n/`:

| Archivo | Qué contiene |
|---|---|
| `src/i18n/es.js` | Textos en español (nombre, roles, descripciones) |
| `src/i18n/en.js` | Textos en inglés |
| `src/data/projects.js` | Proyectos (título, descripción, tags, demo, código) |
| `src/data/testimonials.js` | Testimonios (nombre, cargo, texto) |
| `src/data/experience.js` | Experiencia laboral (periodo, cargo, empresa) |

### Imágenes
Busca los comentarios `AGREGAR IMAGEN` en los archivos para saber dónde colocar:

- `/public/images/perfil.jpg` — Foto de perfil (Hero)
- `/public/images/about.jpg` — Imagen personal (About)
- `/public/images/proyecto-{id}.jpg` — Capturas de pantalla (Proyectos)
- `/public/images/og-image.jpg` — Imagen para Open Graph (compartidos en redes, 1200x630 recomendado)

### Redes sociales
Actualiza los enlaces en `HeroSection.vue` y `ContactSection.vue`:

- GitHub: `https://github.com/tuusuario`
- LinkedIn: `https://linkedin.com/in/tuusuario`
- Email: `tu@email.com`

### Formulario de contacto
El formulario usa [Formspree](https://formspree.io). Reemplaza el ID en `ContactSection.vue`:

```js
fetch('https://formspree.io/f/tu-id-aqui', { ... })
```

## 🚀 Despliegue

### Netlify (recomendado)

```bash
npm run build
# Arrastra la carpeta dist/ a Netlify
```

O conecta tu repositorio de GitHub para deploy automático.

### Vercel

```bash
npm run build
npx vercel --prod
```

## 📦 Comandos

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build para producción
npm run preview   # Vista previa del build
npm run lint      # Lint (ESLint 9 + flat config)
npm run lint:fix  # Lint con autocorrección
npm run format    # Formateo con Prettier
```

## 📄 Licencia

MIT
