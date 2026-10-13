import {
  adminFailure,
  adminJson,
  requireEditor,
  signIn,
  signOut,
} from "@/lib/admin-server"
import {
  assertSameOrigin,
  boundedBody,
  loginSchema,
} from "@/lib/admin-validation"

export async function GET() {
  try {
    const { user } = await requireEditor()
    return adminJson({ user })
  } catch (error) {
    return adminFailure(error)
  }
}

export async function POST(request: Request) {
  try {
    assertSameOrigin(request)
    const { email, password } = loginSchema.parse(
      JSON.parse((await boundedBody(request, 4096)).toString("utf8"))
    )
    return adminJson({ user: await signIn(email, password) })
  } catch (error) {
    return adminFailure(error)
  }
}

export async function DELETE(request: Request) {
  try {
    assertSameOrigin(request)
    return adminJson({ signedOut: true, sessionRevoked: await signOut() })
  } catch (error) {
    return adminFailure(error)
  }
}
