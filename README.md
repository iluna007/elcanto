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

El video de fondo (`el-encanto-drone.mp4`, ~400 MB) no está en Git. Para verlo en local, colócalo en:

```
web/public/videos/el-encanto-drone.mp4
```

O define `VITE_CONTACT_VIDEO_URL` en `web/.env` apuntando a una URL externa.

## Deploy en Netlify

1. Conecta el repositorio [iluna007/elcanto](https://github.com/iluna007/elcanto).
2. Netlify detectará `netlify.toml` automáticamente (`base: web`, `publish: dist`).

### Variable obligatoria (Mapbox)

El mapa **no funcionará** sin esta variable en Netlify:

1. **Site configuration** → **Environment variables** → **Add a variable**
2. **Key:** `VITE_MAPBOX_TOKEN`
3. **Value:** tu token público de Mapbox (empieza con `pk.`)
4. **Scopes:** *All scopes* (o al menos *Builds*)
5. Guarda y haz **Trigger deploy** → **Clear cache and deploy site**

> Vite incluye las variables `VITE_*` en el bundle **durante el build**. Si añades la variable después del primer deploy, debes volver a desplegar.

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
