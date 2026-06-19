import { useEffect, useMemo, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'
import {
  Check, ChevronDown, CircleHelp, Download, History, ImagePlus,
  Link2, Moon, QrCode, RotateCcw, ScanLine, ShieldCheck, Sparkles, Type, Upload, X,
} from 'lucide-react'

const TEMPLATES = [
  { id:'classic', name:'Classic', icon:'✦', fg:'#17231b', bg:'#ffffff', accent:'#d7f44a', dot:'rounded', motif:'clean' },
  { id:'ocean', name:'Ocean', icon:'〰', fg:'#086b78', bg:'#ecfbfa', accent:'#63d6d1', dot:'dots', motif:'wave' },
  { id:'garden', name:'Garden', icon:'❀', fg:'#317a55', bg:'#f0fbf3', accent:'#95d8a9', dot:'classy-rounded', motif:'flora' },
  { id:'birthday', name:'Birthday', icon:'●', fg:'#a53a88', bg:'#fff1fa', accent:'#ff8ac8', dot:'dots', motif:'party' },
  { id:'love', name:'Love', icon:'♥', fg:'#df315c', bg:'#fff1f4', accent:'#ff94ad', dot:'extra-rounded', motif:'hearts' },
  { id:'wedding', name:'Wedding', icon:'❦', fg:'#8e6b42', bg:'#fffaf0', accent:'#d9bb86', dot:'classy-rounded', motif:'elegant' },
  { id:'cafe', name:'Café', icon:'☕', fg:'#6d3c24', bg:'#fff7ef', accent:'#d59669', dot:'rounded', motif:'badge' },
  { id:'lemon', name:'Fresh', icon:'◒', fg:'#4c8b30', bg:'#fbffec', accent:'#d9ed52', dot:'dots', motif:'fruit' },
  { id:'sunset', name:'Sunset', icon:'☀', fg:'#d94b24', bg:'#fff4eb', accent:'#ffb04c', dot:'extra-rounded', motif:'burst' },
  { id:'royal', name:'Royal', icon:'♛', fg:'#532c88', bg:'#f8f0ff', accent:'#b887e8', dot:'classy-rounded', motif:'arch' },
  { id:'night', name:'Midnight', icon:'☾', fg:'#ede6ff', bg:'#171126', accent:'#7451a6', dot:'rounded', motif:'night' },
  { id:'business', name:'Business', icon:'↗', fg:'#193d91', bg:'#f0f4ff', accent:'#7da2ff', dot:'square', motif:'card' },
  { id:'shopping', name:'Shop', icon:'◇', fg:'#a54157', bg:'#fff5f2', accent:'#e9a891', dot:'rounded', motif:'tag' },
  { id:'music', name:'Music', icon:'♫', fg:'#5d2aa6', bg:'#f8f2ff', accent:'#e168d4', dot:'dots', motif:'party' },
  { id:'travel', name:'Travel', icon:'✈', fg:'#116d8c', bg:'#effaff', accent:'#76cbe3', dot:'classy-rounded', motif:'card' },
  { id:'fitness', name:'Fitness', icon:'⚡', fg:'#1f683b', bg:'#effaf2', accent:'#71d18d', dot:'extra-rounded', motif:'burst' },
  { id:'food', name:'Food', icon:'✿', fg:'#b64e20', bg:'#fff6eb', accent:'#ffb66f', dot:'rounded', motif:'flora' },
  { id:'tech', name:'Tech', icon:'⌘', fg:'#0a5bd8', bg:'#eef5ff', accent:'#66a1ff', dot:'square', motif:'clean' },
  { id:'holiday', name:'Holiday', icon:'★', fg:'#17633b', bg:'#f3fff7', accent:'#ed5a5a', dot:'classy-rounded', motif:'hearts' },
  { id:'autumn', name:'Autumn', icon:'◆', fg:'#a9491e', bg:'#fff4e8', accent:'#e78a36', dot:'rounded', motif:'flora' },
  { id:'spring', name:'Spring', icon:'❁', fg:'#268770', bg:'#effcf7', accent:'#ef83b7', dot:'dots', motif:'flora' },
  { id:'baby', name:'Baby', icon:'☁', fg:'#7292cf', bg:'#f4f8ff', accent:'#b8cdf6', dot:'extra-rounded', motif:'wave' },
  { id:'gaming', name:'Gaming', icon:'◆', fg:'#8df52d', bg:'#151b18', accent:'#4d742e', dot:'square', motif:'night' },
  { id:'festival', name:'Festival', icon:'✺', fg:'#e32477', bg:'#fff3fb', accent:'#ffcf39', dot:'dots', motif:'party' },
]

const DEFAULT_SETTINGS = {
  value: 'https://qraft.studio/hello', fg: '#17231b', bg: '#ffffff',
  dot: 'rounded', corner: 'extra-rounded', size: 320, margin: 12, level: 'H', image: '',
}

function App() {
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS }))
  const [template, setTemplate] = useState(TEMPLATES[0])
  const [tab, setTab] = useState('url')
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState([])
  const previewRef = useRef(null)
  const qrRef = useRef(null)

  const qrOptions = useMemo(() => ({
    width: settings.size,
    height: settings.size,
    type: 'canvas',
    data: settings.value || ' ',
    image: settings.image || undefined,
    margin: settings.margin,
    qrOptions: { errorCorrectionLevel: settings.level },
    dotsOptions: { color: settings.fg, type: settings.dot },
    backgroundOptions: { color: settings.bg },
    cornersSquareOptions: { color: settings.fg, type: settings.corner },
    cornersDotOptions: { color: settings.fg, type: 'dot' },
    imageOptions: { crossOrigin: 'anonymous', margin: 6, imageSize: 0.34 },
  }), [settings])

  useEffect(() => {
    if (!previewRef.current) return
    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling(qrOptions)
      qrRef.current.append(previewRef.current)
    } else qrRef.current.update(qrOptions)
  }, [qrOptions])

  const update = (key, value) => setSettings(current => ({ ...current, [key]: value }))

  const chooseTemplate = selected => {
    setTemplate(selected)
    setSettings(current => ({ ...current, fg: selected.fg, bg: selected.bg, dot: selected.dot }))
  }

  const handleLogo = event => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => update('image', reader.result)
    reader.readAsDataURL(file)
  }

  const download = extension => {
    qrRef.current?.download({ name: 'qraft-qr-code', extension })
    setHistory(items => [{ value: settings.value, fg: settings.fg, time: 'Just now' }, ...items].slice(0, 3))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#"><span className="brand-mark"><QrCode size={22} /></span>Qraft<span>.</span></a>
        <nav><a className="active" href="#studio">Studio</a><a href="#how">How it works</a><a href="#faq">FAQ</a></nav>
        <div className="header-actions"><button className="icon-button" aria-label="Toggle theme"><Moon size={18} /></button><button className="outline-button"><History size={17} /> My codes</button></div>
      </header>

      <section className="hero">
        <div className="eyebrow"><Sparkles size={14} /> FREE · PRIVATE · NO SIGN-UP</div>
        <h1>Free custom QR code<br /><em>generator with logo.</em></h1>
        <p>Create a custom QR code online in seconds. Personalize colors, patterns and templates, add your logo, then download a high-quality PNG or SVG for free.</p>
        <a className="hero-cta" href="#studio">Create a free QR code <span>↓</span></a>
      </section>

      <section className="studio" id="studio">
        <div className="editor-panel">
          <div className="step-heading"><span>01</span><div><h2>What should it open?</h2><p>Enter the destination for your QR code.</p></div></div>
          <div className="type-tabs">
            <button className={tab === 'url' ? 'selected' : ''} onClick={() => setTab('url')}><Link2 size={17}/> URL</button>
            <button className={tab === 'text' ? 'selected' : ''} onClick={() => setTab('text')}><Type size={17}/> Text</button>
          </div>
          <label className="field-label">{tab === 'url' ? 'Website URL' : 'Your text'}</label>
          <div className="url-input"><Link2 size={18}/><input aria-label={tab === 'url' ? 'Website URL for QR code' : 'Text for QR code'} value={settings.value} onChange={e => update('value', e.target.value)} placeholder={tab === 'url' ? 'https://yourwebsite.com' : 'Type something…'} /><button onClick={() => {setSettings({ ...DEFAULT_SETTINGS }); setCopied(true); setTimeout(()=>setCopied(false), 1000)}} aria-label="Reset QR code settings"><RotateCcw size={16}/></button></div>
          <div className="input-meta"><span className={settings.value ? 'valid' : ''}>{settings.value ? <Check size={13}/> : <CircleHelp size={13}/>} {settings.value ? 'Ready to scan' : 'Add some content'}</span><span>{settings.value.length}/2048</span></div>

          <div className="divider" />
          <div className="step-heading compact"><span>02</span><div><h2>Make it yours</h2><p>Shape it, color it, brand it.</p></div></div>

          <div className="template-section">
            <div className="label-row"><div><h3>Ready-made templates</h3><p>Pick a mood, then fine-tune it below.</p></div><span>{TEMPLATES.length} styles</span></div>
            <div className="template-grid">
              {TEMPLATES.map(item => <button key={item.id} className={template.id === item.id ? 'selected' : ''} onClick={() => chooseTemplate(item)} style={{'--t-fg':item.fg,'--t-bg':item.bg,'--t-accent':item.accent}}>
                <span className={`template-thumb motif-${item.motif}`}><i className="mini-qr"/><b>{item.icon}</b></span><small>{item.name}</small>{template.id === item.id && <Check size={12}/>}</button>)}
            </div>
          </div>

          <div className="control-section">
            <h3>Style</h3>
            <label className="field-label">Dot pattern</label>
            <div className="style-grid">
              {['square','rounded','dots','classy-rounded','extra-rounded'].map((dot, i) => <button key={dot} title={dot} className={settings.dot === dot ? 'selected' : ''} onClick={() => update('dot', dot)}><span className={`pattern p${i}`}/></button>)}
            </div>
          </div>

          <div className="two-col">
            <div><label className="field-label">QR color</label><ColorInput value={settings.fg} onChange={v => update('fg', v)} /></div>
            <div><label className="field-label">Background</label><ColorInput value={settings.bg} onChange={v => update('bg', v)} /></div>
          </div>

          <div className="control-section">
            <div className="label-row"><label className="field-label">Add your logo <span>Optional</span></label>{settings.image && <button className="text-button" onClick={() => update('image','')}><X size={14}/> Remove</button>}</div>
            <label className="logo-drop"><input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogo}/><span className="upload-icon"><ImagePlus size={20}/></span><span><b>{settings.image ? 'Logo added' : 'Upload a logo'}</b><small>PNG, JPG or SVG · max 2MB</small></span><Upload size={17}/></label>
          </div>

          <div className="two-col">
            <div><label className="field-label">Size <span>{settings.size}px</span></label><input type="range" min="200" max="600" step="20" value={settings.size} onChange={e => update('size', +e.target.value)}/></div>
            <div><label className="field-label">Quiet zone <span>{settings.margin}px</span></label><input type="range" min="0" max="40" value={settings.margin} onChange={e => update('margin', +e.target.value)}/></div>
          </div>

        </div>

        <aside className="preview-panel">
          <div className="preview-sticky">
            <div className="preview-header"><span><ScanLine size={18}/> Live preview</span><div className="status-dot">SCANNABLE</div></div>
            <div className={`qr-stage preview-${template.motif}`} style={{'--accent':template.accent,'--theme-fg':template.fg}}><div className="decor decor-one"/><div className="decor decor-two"/><div className="qr-frame" style={{background: settings.bg}}><div className="template-art art-top">{template.icon}</div><div ref={previewRef} className="qr-canvas" /><div className="template-art art-bottom">{template.name}</div></div></div>
            <p className="scan-copy">Point your camera at the code to test it.</p>
            <div className="download-row"><button className="primary-button" onClick={() => download('png')}><Download size={18}/> Download PNG</button><button className="format-button" onClick={() => download('svg')}>SVG <ChevronDown size={15}/></button></div>
            <div className="privacy"><ShieldCheck size={18}/><p><b>Private by design</b><br/>Your QR code is created entirely in your browser.</p></div>
            {history.length > 0 && <div className="recent"><h3>Recent exports</h3>{history.map((item,i)=><div key={i}><span style={{background:item.fg}}/><p>{item.value || 'Untitled code'}<small>{item.time}</small></p></div>)}</div>}
          </div>
        </aside>
      </section>

      <section className="seo-section benefits" id="how" aria-labelledby="how-title">
        <div className="section-kicker">HOW IT WORKS</div>
        <h2 id="how-title">Create a custom QR code in three steps</h2>
        <p className="section-lead">Qraft makes professional QR code design quick, private and beginner-friendly.</p>
        <div className="steps-grid">
          <article><span>01</span><h3>Add your destination</h3><p>Paste a website URL or enter the text you want people to see after scanning.</p></article>
          <article><span>02</span><h3>Customize the design</h3><p>Choose from 24 templates, change colors and patterns, or upload your own logo.</p></article>
          <article><span>03</span><h3>Test and download</h3><p>Scan the live preview, then download your custom QR code as a crisp PNG or scalable SVG.</p></article>
        </div>
      </section>

      <section className="seo-section feature-section" aria-labelledby="features-title">
        <div className="feature-copy">
          <div className="section-kicker">BUILT FOR EVERYDAY USE</div>
          <h2 id="features-title">A free QR code generator that still feels premium</h2>
          <p>Make branded QR codes for menus, business cards, product packaging, events, social profiles, posters and more. Every code is generated directly in your browser.</p>
        </div>
        <div className="feature-list">
          <article><b>24</b><span>creative templates</span></article>
          <article><b>5</b><span>QR dot patterns</span></article>
          <article><b>PNG + SVG</b><span>high-quality exports</span></article>
          <article><b>100%</b><span>private generation</span></article>
        </div>
      </section>

      <section className="seo-section faq-section" id="faq" aria-labelledby="faq-title">
        <div className="section-kicker">COMMON QUESTIONS</div>
        <h2 id="faq-title">Custom QR code generator FAQ</h2>
        <div className="faq-list">
          <details><summary>Is Qraft's custom QR code generator free?</summary><p>Yes. Qraft is free to use, requires no account, and lets you download custom QR codes as PNG or SVG files.</p></details>
          <details><summary>Can I add a logo to my QR code?</summary><p>Yes. Upload a PNG, JPG or SVG logo and Qraft places it in the center while using high error correction to preserve scan reliability.</p></details>
          <details><summary>Do Qraft QR codes expire?</summary><p>No. Qraft creates static QR codes, so they do not expire. A code continues to work as long as its destination remains available.</p></details>
          <details><summary>Are custom QR codes safe to scan?</summary><p>Yes, provided the destination itself is trustworthy. Always test your finished code on more than one phone before printing it at scale.</p></details>
          <details><summary>Is my QR code data private?</summary><p>Yes. QR codes are generated locally in your browser, so your entered content and uploaded logo are not sent to a server by Qraft.</p></details>
          <details><summary>What format should I download?</summary><p>Choose PNG for websites, social posts and documents. Choose SVG for print, signage and designs that may need to scale without losing quality.</p></details>
        </div>
      </section>

      <footer><span>Qraft — free custom QR codes, made for the internet.</span><span><a href="#studio">Generator</a> · <a href="#how">How it works</a> · <a href="#faq">FAQ</a> · <a href="/about.html">About</a> · <a href="/contact.html">Contact</a> · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span><span>Private · No sign-up</span></footer>
      {copied && <div className="toast"><Check size={16}/> Reset complete</div>}
    </main>
  )
}

function ColorInput({ value, onChange }) {
  return <div className="color-input"><input type="color" value={value} onChange={e => onChange(e.target.value)}/><input value={value.toUpperCase()} onChange={e => /^#[0-9a-f]{0,6}$/i.test(e.target.value) && onChange(e.target.value)} /></div>
}

export default App
