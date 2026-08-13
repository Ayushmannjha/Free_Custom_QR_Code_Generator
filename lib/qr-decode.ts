import jsQR from 'jsqr'
import sharp from 'sharp'

export type DecodeQrResult =
  | {
      data: string
      error?: never
    }
  | {
      data?: never
      error: string
    }

export async function decodeQrFile(file: File): Promise<DecodeQrResult> {
  if (file.size > 5 * 1024 * 1024) {
    return { error: 'Uploaded QR image must be 5 MB or smaller.' }
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const { data, info } = await sharp(buffer)
      .rotate()
      .ensureAlpha()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .raw()
      .toBuffer({ resolveWithObject: true })

    const decoded = jsQR(new Uint8ClampedArray(data), info.width, info.height)

    if (!decoded?.data) {
      return { error: 'Could not read a QR code from the uploaded image. Try a clearer PNG/JPG/WebP/SVG QR image.' }
    }

    return { data: decoded.data }
  } catch {
    return { error: 'Unsupported or unreadable image. Upload a PNG, JPG, WebP, or SVG QR image.' }
  }
}

export function getUploadedQrFile(formData: FormData) {
  const value = formData.get('qr') || formData.get('file') || formData.get('image')
  return value instanceof File ? value : null
}
