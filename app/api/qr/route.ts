import qrcode from 'qrcode-generator'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H'

const errorLevels: ErrorCorrectionLevel[] = ['L', 'M', 'Q', 'H']

export const dynamic = 'force-dynamic'

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  return createQrResponse({
    data: url.searchParams.get('data'),
    size: url.searchParams.get('size'),
    margin: url.searchParams.get('margin'),
    level: url.searchParams.get('level'),
  })
}

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonError('Send JSON body like { "data": "https://example.com" }.', 400)
  }

  if (!body || typeof body !== 'object') {
    return jsonError('Request body must be a JSON object.', 400)
  }

  const payload = body as Record<string, unknown>

  return createQrResponse({
    data: typeof payload.data === 'string' ? payload.data : null,
    size: typeof payload.size === 'number' || typeof payload.size === 'string' ? String(payload.size) : null,
    margin: typeof payload.margin === 'number' || typeof payload.margin === 'string' ? String(payload.margin) : null,
    level: typeof payload.level === 'string' ? payload.level : null,
  })
}

function createQrResponse({ data, size, margin, level }: { data: string | null; size: string | null; margin: string | null; level: string | null }) {
  const value = data?.trim()

  if (!value) {
    return jsonError('Missing required "data" value. Example: /api/qr?data=https%3A%2F%2Fexample.com', 400)
  }

  if (value.length > 2048) {
    return jsonError('"data" must be 2048 characters or fewer.', 400)
  }

  const errorCorrectionLevel = normalizeLevel(level)
  const modules = qrcode(0, errorCorrectionLevel)

  try {
    modules.addData(value, 'Byte')
    modules.make()
  } catch {
    return jsonError('Could not generate a QR code for this data.', 400)
  }

  const moduleCount = modules.getModuleCount()
  const requestedSize = clampNumber(size, 128, 2048, 512)
  const requestedMargin = clampNumber(margin, 0, 20, 4)
  const totalCells = moduleCount + requestedMargin * 2
  const cellSize = Math.max(1, Math.floor(requestedSize / totalCells))
  const actualSize = totalCells * cellSize
  const offset = requestedMargin * cellSize
  const cells: string[] = []

  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (modules.isDark(row, col)) {
        cells.push(`<rect x="${offset + col * cellSize}" y="${offset + row * cellSize}" width="${cellSize}" height="${cellSize}" />`)
      }
    }
  }

  const svg = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${actualSize}" height="${actualSize}" viewBox="0 0 ${actualSize} ${actualSize}" role="img" aria-label="QR code">`,
    '<rect width="100%" height="100%" fill="#ffffff" />',
    '<g fill="#17231b">',
    cells.join(''),
    '</g>',
    '</svg>',
  ].join('')

  return new Response(svg, {
    headers: {
      ...corsHeaders,
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

function normalizeLevel(level: string | null): ErrorCorrectionLevel {
  const normalized = level?.toUpperCase()
  return errorLevels.includes(normalized as ErrorCorrectionLevel) ? (normalized as ErrorCorrectionLevel) : 'H'
}

function clampNumber(value: string | null, min: number, max: number, fallback: number) {
  if (value === null) {
    return fallback
  }

  const parsed = Number(value)

  if (!Number.isFinite(parsed)) {
    return fallback
  }

  return Math.min(max, Math.max(min, Math.round(parsed)))
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
