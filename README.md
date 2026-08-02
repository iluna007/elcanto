# El Encanto

Sitio web interactivo para El Encanto — mapa Mapbox, galería de proyectos, contacto y sobre nosotros.

## Desarrollo local

```bash
npm install
cd web && npm install
cd ..
npm run dev
```

Copia `.env.example` a `web/.env` y configura las variables si lo necesitas.

### Video de contacto (local)

El fondo de `/contacto` usa el master en alta calidad:

```
web/public/videos/el-encanto-drone-source.mp4
```

Ese archivo (~384 MB) no está en Git (límite de GitHub). En local, colócalo ahí y Vite lo servirá.

En producción (Netlify) se usa el fallback comprimido `el-encanto-drone.mp4` (~9 MB, sí está en el repo). Para servir el master en prod, define `VITE_CONTACT_VIDEO_URL` en `web/.env` apuntando a una URL externa (CDN, Netlify Large Media, etc.).

## Deploy en Netlify

1. Conecta el repositorio [iluna007/elcanto](https://github.com/iluna007/elcanto).
2. Netlify detectará `netlify.toml` automáticamente (`base: web`, `publish: dist`).

### Variable opcional (Mapbox)

Por defecto el sitio incluye un token público de Mapbox (`pk.`). Opcionalmente puedes definir el tuyo en Netlify:

- **Key:** `VITE_MAPBOX_TOKEN`
- **Scopes:** *Builds* o *All scopes*

### Variable opcional (video de contacto)

- `VITE_CONTACT_VIDEO_URL` — URL del video drone (Cloudinary, S3, etc.)

## Estructura

```
elencanto/
├── web/           # App Vite + React
├── logos/         # Logo fuente (SVG/PNG)
├── package.json   # Scripts raíz
└── netlify.toml
```

Las carpetas `Casas/`, `Mapas/`, `3D Models/` y el folder de marketing original son assets de diseño local y **no** se suben al repositorio.
