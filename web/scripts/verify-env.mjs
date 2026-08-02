import { loadEnv } from 'vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const env = loadEnv(process.env.NODE_ENV === 'development' ? 'development' : 'production', root, '')
const token = (process.env.VITE_MAPBOX_TOKEN || env.VITE_MAPBOX_TOKEN || '').trim()

if (!token) {
  console.error(`
[build] Missing VITE_MAPBOX_TOKEN

Mapbox requires a public access token at build time (Vite inlines it into the bundle).

Netlify:
  Site configuration → Environment variables → Add variable
  Key:   VITE_MAPBOX_TOKEN
  Value: your Mapbox public token (starts with pk.)
  Scopes: All scopes (or at least "Builds")

Then trigger: Deploys → Trigger deploy → Clear cache and deploy site

Local:
  Copy web/.env.example to web/.env and set VITE_MAPBOX_TOKEN
`)
  process.exit(1)
}

if (!token.startsWith('pk.')) {
  console.warn('[build] VITE_MAPBOX_TOKEN should be a public token (pk.), not a secret token (sk.).')
}
