import sharp from "sharp"
import { randomUUID } from "node:crypto"
import {
  AdminError,
  adminFailure,
  adminFetch,
  adminJson,
  projectOrigin,
  requireEditor,
} from "@/lib/admin-server"
import { assertSameOrigin, boundedBody } from "@/lib/admin-validation"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    assertSameOrigin(request)
    const { token } = await requireEditor()
    const source = await boundedBody(request, 5 * 1024 * 1024)
    let output: { data: Buffer; info: sharp.OutputInfo }
    try {
      const image = sharp(source, {
        limitInputPixels: 32000000,
        animated: false,
        failOn: "warning",
      })
      const metadata = await image.metadata()
      if (
        !["jpeg", "png", "webp"].includes(metadata.format ?? "") ||
        !metadata.width ||
        !metadata.height ||
        metadata.width > 8000 ||
        metadata.height > 8000 ||
        (metadata.pages ?? 1) > 1
      )
        throw new Error("Unsupported image")
      // Re-encode to strip metadata and avoid trusting the supplied filename or MIME type.
      output = await image
        .rotate()
        .webp({ quality: 85 })
        .toBuffer({ resolveWithObject: true })
    } catch {
      throw new AdminError(
        400,
        "Choose a valid JPEG, PNG or WebP image up to 5 MB and 32 million pixels."
      )
    }
    if (output.data.length > 5 * 1024 * 1024)
      throw new AdminError(413, "The processed image exceeds 5 MB.")
    const path = `modules/${randomUUID()}.webp`
    const response = await adminFetch(
      `/storage/v1/object/landing-media/${path}`,
      token,
      {
        method: "POST",
        headers: { "Content-Type": "image/webp", "x-upsert": "false" },
        body: new Uint8Array(output.data),
      }
    )
    if (!response.ok)
      throw new AdminError(
        503,
        "Upload failed. Check the landing-media editor policy and try again."
      )
    return adminJson({
      src: `${projectOrigin()}/storage/v1/object/public/landing-media/${path}`,
      width: output.info.width,
      height: output.info.height,
    })
  } catch (error) {
    return adminFailure(error)
  }
}
