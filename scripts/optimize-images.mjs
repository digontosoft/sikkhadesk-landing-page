import { mkdir, readdir, stat } from "node:fs/promises"
import { basename } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const publicRoot = new URL("../public/", import.meta.url)
const heroDirectory = new URL("images/hero/", publicRoot)
const logoDirectory = new URL("images/logos/", publicRoot)
const socialDirectory = new URL("images/social/", publicRoot)
const results = []

await mkdir(new URL("optimized/", logoDirectory), { recursive: true })
await mkdir(socialDirectory, { recursive: true })

for (const width of [480, 800, 1200, 1536]) {
  const target = new URL(`dashboard-${width}.webp`, heroDirectory)
  await sharp(fileURLToPath(new URL("dashboard.png", heroDirectory)))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(fileURLToPath(target))
  results.push({
    file: `dashboard-${width}.webp`,
    bytes: (await stat(target)).size,
  })
}

const logoFiles = (await readdir(logoDirectory)).filter((file) =>
  /\.(jpg|jpeg)$/i.test(file)
)
for (const file of [...logoFiles, "logo.png", "help-center.png"]) {
  const targetName = `${basename(file, file.slice(file.lastIndexOf(".")))}.webp`
  const source = new URL(file, logoDirectory)
  const target = new URL(`optimized/${targetName}`, logoDirectory)
  const width =
    file === "logo.png" ? 740 : file === "help-center.png" ? 128 : 192
  await sharp(fileURLToPath(source))
    .resize({
      width,
      height: file === "help-center.png" ? 128 : undefined,
      fit: "cover",
      withoutEnlargement: true,
    })
    .webp({ quality: file === "logo.png" ? 90 : 82, effort: 6 })
    .toFile(fileURLToPath(target))
  results.push({
    file: `optimized/${targetName}`,
    bytes: (await stat(target)).size,
  })
}

const background =
  Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#f5f7ff"/><stop offset="1" stop-color="#e7e5fb"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="18" height="630" fill="#5b4fcf"/>
  <text x="64" y="220" font-family="Arial, sans-serif" font-size="53" font-weight="700" fill="#0f172a">School Management</text>
  <text x="64" y="283" font-family="Arial, sans-serif" font-size="53" font-weight="700" fill="#5b4fcf">Software in Bangladesh</text>
  <text x="64" y="351" font-family="Arial, sans-serif" font-size="25" fill="#475569">Students. Attendance. Fees. Exams. Results.</text>
  <rect x="64" y="405" width="300" height="58" rx="14" fill="#5b4fcf"/>
  <text x="86" y="443" font-family="Arial, sans-serif" font-size="25" font-weight="700" fill="white">14-day free trial</text>
  <text x="64" y="558" font-family="Arial, sans-serif" font-size="25" fill="#475569">www.sikkhadesk.com</text>
</svg>`)
const logo = await sharp(fileURLToPath(new URL("logo.png", logoDirectory)))
  .resize({ width: 320 })
  .png()
  .toBuffer()
const screenshot = await sharp(
  fileURLToPath(new URL("dashboard.png", heroDirectory))
)
  .resize({ width: 380, height: 285, fit: "inside" })
  .png()
  .toBuffer()
const shareImage = new URL("sikkhadesk-school-management.png", socialDirectory)
await sharp(background)
  .composite([
    { input: logo, left: 64, top: 56 },
    { input: screenshot, left: 780, top: 215 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(fileURLToPath(shareImage))
results.push({
  file: "social/sikkhadesk-school-management.png",
  bytes: (await stat(shareImage)).size,
})

console.log(JSON.stringify(results, null, 2))
