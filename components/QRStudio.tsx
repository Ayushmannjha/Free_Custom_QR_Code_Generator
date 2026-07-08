'use client'

import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import {
  Check,
  ChevronDown,
  CircleHelp,
  Download,
  History,
  ImagePlus,
  Link2,
  QrCode,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Type,
  Upload,
  X,
} from 'lucide-react'

type Template = {
  id: string
  name: string
  icon: string
  fg: string
  bg: string
  accent: string
  dot: 'square' | 'rounded' | 'dots' | 'classy-rounded' | 'extra-rounded'
}

const templates: Template[] = [
  { id: 'classic', name: 'Classic', icon: 'QR', fg: '#17231b', bg: '#ffffff', accent: '#d7f44a', dot: 'rounded' },
  { id: 'ocean', name: 'Ocean', icon: 'SEA', fg: '#086b78', bg: '#ecfbfa', accent: '#63d6d1', dot: 'dots' },
  { id: 'garden', name: 'Garden', icon: 'BIO', fg: '#317a55', bg: '#f0fbf3', accent: '#95d8a9', dot: 'classy-rounded' },
  { id: 'cafe', name: 'Cafe', icon: 'MENU', fg: '#6d3c24', bg: '#fff7ef', accent: '#d59669', dot: 'rounded' },
  { id: 'business', name: 'Business', icon: 'BIZ', fg: '#193d91', bg: '#f0f4ff', accent: '#7da2ff', dot: 'square' },
  { id: 'event', name: 'Event', icon: 'PASS', fg: '#5d2aa6', bg: '#f8f2ff', accent: '#e168d4', dot: 'dots' },
]

type Settings = {
  value: string
  fg: string
  bg: string
  dot: Template['dot']
  corner: 'square' | 'extra-rounded' | 'dot'
  size: number
  margin: number
  level: 'L' | 'M' | 'Q' | 'H'
  image: string
}

const defaultSettings: Settings = {
  value: 'https://qr.antss.in/',
  fg: '#17231b',
  bg: '#ffffff',
  dot: 'rounded',
  corner: 'extra-rounded',
  size: 320,
  margin: 12,
  level: 'H',
  image: '',
}

export function QRStudio() {
  const [settings, setSettings] = useState<Settings>({ ...defaultSettings })
  const [template, setTemplate] = useState(templates[0])
  const [tab, setTab] = useState<'url' | 'text'>('url')
  const [history, setHistory] = useState<{ value: string; fg: string; time: string }[]>([])
  const previewRef = useRef<HTMLDivElement | null>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)

  const qrOptions = useMemo(
    () => ({
      width: settings.size,
      height: settings.size,
      type: 'canvas' as const,
      data: settings.value || ' ',
      image: settings.image || undefined,
      margin: settings.margin,
      qrOptions: { errorCorrectionLevel: settings.level },
      dotsOptions: { color: settings.fg, type: settings.dot },
      backgroundOptions: { color: settings.bg },
      cornersSquareOptions: { color: settings.fg, type: settings.corner },
      cornersDotOptions: { color: settings.fg, type: 'dot' as const },
      imageOptions: { crossOrigin: 'anonymous' as const, margin: 6, imageSize: 0.34 },
    }),
    [settings],
  )

  useEffect(() => {
    if (!previewRef.current) return
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(qrOptions)
      qrRef.current.append(previewRef.current)
      return
    }
    qrRef.current.update(qrOptions)
  }, [qrOptions])

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  const chooseTemplate = (selected: Template) => {
    setTemplate(selected)
    setSettings((current) => ({ ...current, fg: selected.fg, bg: selected.bg, dot: selected.dot }))
  }

  const handleLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update('image', String(reader.result || ''))
    reader.readAsDataURL(file)
  }

  const download = (extension: 'png' | 'svg') => {
    qrRef.current?.download({ name: 'qraft-qr-code', extension })
    setHistory((items) => [{ value: settings.value, fg: settings.fg, time: 'Just now' }, ...items].slice(0, 3))
  }

  return (
    <section id="generator" className="mx-auto grid max-w-7xl scroll-mt-24 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-soft lg:grid-cols-[1.1fr_.9fr]">
      <div className="space-y-8 p-5 sm:p-8 lg:p-10">
        <div className="flex gap-4">
          <span className="mt-1 grid h-7 min-w-11 place-items-center rounded-full bg-ink text-xs font-bold tracking-wider text-white">01</span>
          <div>
            <h2 className="font-display text-3xl text-ink">What should your QR code open?</h2>
            <p className="mt-1 text-sm text-stone-600">Paste a destination, write plain text, or prepare a value for a QR type page.</p>
          </div>
        </div>

        <div className="grid rounded-xl bg-stone-100 p-1 sm:grid-cols-2">
          <button className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${tab === 'url' ? 'bg-white shadow-sm' : ''}`} onClick={() => setTab('url')}>
            <Link2 size={17} /> URL
          </button>
          <button className={`flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold ${tab === 'text' ? 'bg-white shadow-sm' : ''}`} onClick={() => setTab('text')}>
            <Type size={17} /> Text
          </button>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-700">{tab === 'url' ? 'Website URL' : 'Text content'}</span>
          <span className="flex h-12 items-center gap-3 rounded-xl border border-stone-300 px-3 focus-within:border-moss focus-within:ring-4 focus-within:ring-lime/30">
            <Link2 size={18} className="text-stone-500" />
            <input
              aria-label={tab === 'url' ? 'Website URL for QR code' : 'Text for QR code'}
              className="min-w-0 flex-1 bg-transparent outline-none"
              value={settings.value}
              onChange={(event) => update('value', event.target.value)}
              placeholder={tab === 'url' ? 'https://yourwebsite.com' : 'Type something useful'}
            />
            <button onClick={() => setSettings({ ...defaultSettings })} aria-label="Reset QR code settings" className="rounded-md p-1 text-stone-500 hover:bg-stone-100">
              <RotateCcw size={16} />
            </button>
          </span>
        </label>

        <div className="flex justify-between text-xs text-stone-500">
          <span className={`inline-flex items-center gap-1 ${settings.value ? 'text-moss' : ''}`}>{settings.value ? <Check size={13} /> : <CircleHelp size={13} />} {settings.value ? 'Ready to scan' : 'Add content first'}</span>
          <span>{settings.value.length}/2048</span>
        </div>

        <div className="border-t border-stone-200 pt-8">
          <div className="mb-5 flex gap-4">
            <span className="mt-1 grid h-7 min-w-11 place-items-center rounded-full bg-ink text-xs font-bold tracking-wider text-white">02</span>
            <div>
              <h2 className="font-display text-3xl text-ink">Make it fit your brand</h2>
              <p className="mt-1 text-sm text-stone-600">Choose a style, set colors, add a logo, then download PNG or SVG.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {templates.map((item) => (
              <button
                key={item.id}
                onClick={() => chooseTemplate(item)}
                className={`rounded-xl border p-3 text-left transition hover:-translate-y-0.5 ${template.id === item.id ? 'border-moss ring-2 ring-lime' : 'border-stone-200'}`}
                style={{ background: item.bg }}
              >
                <span className="mb-3 grid aspect-square place-items-center rounded-lg text-sm font-black" style={{ color: item.fg, background: item.accent }}>
                  <QrCode size={30} />
                </span>
                <span className="block truncate text-xs font-bold" style={{ color: item.fg }}>{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <ColorInput label="QR color" value={settings.fg} onChange={(value) => update('fg', value)} />
          <ColorInput label="Background" value={settings.bg} onChange={(value) => update('bg', value)} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide text-stone-700">Add your logo</span>
            {settings.image ? (
              <button className="inline-flex items-center gap-1 text-xs font-semibold text-red-700" onClick={() => update('image', '')}>
                <X size={14} /> Remove
              </button>
            ) : null}
          </div>
          <label className="flex min-h-16 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-stone-300 px-4 hover:bg-stone-50">
            <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogo} className="hidden" />
            <span className="grid size-9 place-items-center rounded-lg bg-stone-100">
              <ImagePlus size={20} />
            </span>
            <span className="flex-1">
              <b className="block text-sm">{settings.image ? 'Logo added' : 'Upload a logo'}</b>
              <small className="text-xs text-stone-500">PNG, JPG or SVG. Keep it simple for reliable scanning.</small>
            </span>
            <Upload size={17} />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <RangeInput label="Size" value={settings.size} min={200} max={600} suffix="px" onChange={(value) => update('size', value)} />
          <RangeInput label="Quiet zone" value={settings.margin} min={0} max={40} suffix="px" onChange={(value) => update('margin', value)} />
        </div>
      </div>

      <aside className="bg-stone-100 p-5 sm:p-8 lg:p-10">
        <div className="sticky top-24">
          <div className="mb-6 flex items-center justify-between text-sm font-bold">
            <span className="inline-flex items-center gap-2"><ScanLine size={18} /> Live preview</span>
            <span className="rounded-full bg-lime/60 px-3 py-1 text-[10px] tracking-wider text-moss">SCANNABLE</span>
          </div>
          <div className="grid min-h-80 place-items-center rounded-2xl border border-stone-200 bg-white p-5 shadow-soft">
            <div className="grid aspect-square w-full max-w-sm place-items-center rounded-xl p-5" style={{ background: settings.bg }}>
              <div ref={previewRef} className="grid max-h-full max-w-full place-items-center overflow-hidden [&_canvas]:h-auto! [&_canvas]:max-w-full [&_svg]:h-auto! [&_svg]:max-w-full" />
            </div>
          </div>
          <p className="my-5 text-center text-sm text-stone-600">Test the preview with your phone camera before printing.</p>
          <div className="flex gap-3">
            <button className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-ink px-4 font-bold text-white hover:bg-stone-800" onClick={() => download('png')}>
              <Download size={18} /> Download PNG
            </button>
            <button className="inline-flex h-12 items-center justify-center gap-1 rounded-xl border border-stone-300 bg-white px-4 font-bold" onClick={() => download('svg')}>
              SVG <ChevronDown size={15} />
            </button>
          </div>
          <div className="mt-6 flex gap-3 border-t border-stone-300 pt-5 text-sm text-stone-600">
            <ShieldCheck size={20} className="mt-1 shrink-0 text-moss" />
            <p><b className="text-ink">Private by design.</b><br />Your QR code is generated in your browser. Qraft does not require sign-up to create a static code.</p>
          </div>
          {history.length > 0 ? (
            <div className="mt-6 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-stone-600"><History size={14} className="mr-1 inline" /> Recent exports</h3>
              {history.map((item, index) => (
                <div key={`${item.value}-${index}`} className="flex items-center gap-2 rounded-lg bg-white/70 p-2 text-xs">
                  <span className="size-5 rounded" style={{ background: item.fg }} />
                  <span className="min-w-0 flex-1 truncate">{item.value}</span>
                  <span className="text-stone-400">{item.time}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </aside>
    </section>
  )
}

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-stone-700">{label}</span>
      <span className="flex h-11 items-center gap-3 rounded-xl border border-stone-300 px-3">
        <input type="color" value={value} onChange={(event) => onChange(event.target.value)} className="size-7 cursor-pointer border-0 bg-transparent p-0" />
        <input value={value.toUpperCase()} onChange={(event) => onChange(event.target.value)} className="w-24 bg-transparent text-sm font-semibold outline-none" />
      </span>
    </label>
  )
}

function RangeInput({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return (
    <label className="block">
      <span className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wide text-stone-700">
        {label} <span className="font-medium text-stone-500">{value}{suffix}</span>
      </span>
      <input type="range" min={min} max={max} value={value} onChange={(event) => onChange(Number(event.target.value))} className="w-full accent-moss" />
    </label>
  )
}

