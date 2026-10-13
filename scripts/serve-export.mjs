import { createServer } from "node:http"
import { readFile, stat } from "node:fs/promises"
import { extname, resolve, sep } from "node:path"

const root = resolve("out")
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
}

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://127.0.0.1").pathname
    )
    let target = resolve(root, `.${pathname}`)
    if (target !== root && !target.startsWith(root + sep)) {
      response.writeHead(403).end()
      return
    }
    if ((await stat(target)).isDirectory())
      target = resolve(target, "index.html")
    const content = await readFile(target)
    response
      .writeHead(200, {
        "Content-Type":
          contentTypes[extname(target)] ?? "application/octet-stream",
      })
      .end(content)
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain" }).end("Not found")
  }
}).listen(4173, "127.0.0.1", () =>
  console.log("Static export: http://127.0.0.1:4173")
)
