import { readdir, stat } from 'fs/promises'
import { join, parse } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const PUBLIC = join(fileURLToPath(new URL('../public', import.meta.url)))
const DIRS = ['casas', 'marketing']
const QUALITY = 82

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else if (/\.(jpe?g)$/i.test(entry.name)) {
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
    const { dir: folder, name, ext } = parse(input)
    const output = join(folder, `${name}.webp`)

    const before = (await stat(input)).size
    await sharp(input)
      .webp({ quality: QUALITY, effort: 4 })
      .toFile(output)

    const after = (await stat(output)).size
    totalBefore += before
    totalAfter += after
    count += 1

    const pct = Math.round((1 - after / before) * 100)
    console.log(`${sub}/${name}${ext} → ${name}.webp  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${pct}%)`)
  }
}

console.log(`\nConverted ${count} images`)
console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(2)} MB → ${(totalAfter / 1024 / 1024).toFixed(2)} MB (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`)
