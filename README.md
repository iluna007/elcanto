# El Encanto Outdoors

Sitio web interactivo para El Encanto Outdoors — mapa Mapbox, galería de proyectos, contacto y sobre nosotros.

## Desarrollo local

```bash
npm install
cd web && npm install
cd ..
npm run dev
```

Copia `.env.example` a `web/.env` y configura las variables si lo necesitas.

### Video de contacto (local)

El video de fondo (`el-encanto-drone.mp4`, ~400 MB) no está en Git. Para verlo en local, colócalo en:

```
web/public/videos/el-encanto-drone.mp4
```

O define `VITE_CONTACT_VIDEO_URL` en `web/.env` apuntando a una URL externa.

## Deploy en Netlify

1. Conecta el repositorio [iluna007/elcanto](https://github.com/iluna007/elcanto).
2. Netlify detectará `netlify.toml` automáticamente (`base: web`, `publish: dist`).
3. Variables de entorno recomendadas en Netlify → Site settings → Environment variables:
   - `VITE_MAPBOX_TOKEN` — token público de Mapbox
   - `VITE_CONTACT_VIDEO_URL` — URL del video drone (sube el MP4 a Netlify Large Media, Cloudinary, etc.)

## Estructura

```
elencanto/
├── web/           # App Vite + React
├── logos/         # Logo fuente (SVG/PNG)
├── package.json   # Scripts raíz
└── netlify.toml
```

Las carpetas `Casas/`, `Mapas/`, `3D Models/` y el folder de marketing original son assets de diseño local y **no** se suben al repositorio.
