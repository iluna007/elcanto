import { readdir, stat } from 'fs/promises'
import { join, parse } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const PUBLIC = join(fileURLToPath(new URL('../public', import.meta.url)))
const DIRS = ['casas', 'marketing']
const QUALITY = 82
const WIDTHS = [640, 1200, 2400]

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (/\.webp$/i.test(entry.name) && !/-\d+w\.webp$/i.test(entry.name)) {
      files.push(full)
    }
  }
  return files
}

let totalBefore = 0
let totalAfter = 0
let count = 0

for (const sub of DIRS) {
  const dir = join(PUBLIC, sub)
  const images = await walk(dir)

  for (const input of images) {
    const { dir: folder, name } = parse(input)

    for (const width of WIDTHS) {
      const output = join(folder, `${name}-${width}w.webp`)
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 4 })
        .toFile(output)
      const size = (await stat(output)).size
      totalAfter += size
      count += 1
      console.log(`${sub}/${name}-${width}w.webp  ${(size / 1024).toFixed(0)}KB`)
    }
  }
}

console.log(`\nGenerated ${count} responsive variants`)
console.log(`Estimated total processed: ${(totalAfter / 1024 / 1024).toFixed(2)} MB output`)
