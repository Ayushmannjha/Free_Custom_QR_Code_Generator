import { decodeQrFile, getUploadedQrFile } from '@/lib/qr-decode'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export const dynamic = 'force-dynamic'

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return jsonError('Could not read multipart form data.', 400)
  }

  const uploaded = getUploadedQrFile(formData)

  if (!uploaded) {
    return jsonError('Upload a QR image using the "qr", "file", or "image" form field.', 400)
  }

  const result = await decodeQrFile(uploaded)

  if (result.error) {
    return jsonError(result.error, 400)
  }

  return Response.json(
    { data: result.data },
    {
      headers: {
        ...corsHeaders,
        'Cache-Control': 'no-store',
      },
    },
  )
}

function jsonError(message: string, status: number) {
  return Response.json(
    { error: message },
    {
      status,
      headers: corsHeaders,
    },
  )
}
