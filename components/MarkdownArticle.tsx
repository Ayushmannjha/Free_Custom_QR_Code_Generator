export function MarkdownArticle({ markdown }: { markdown: string }) {
  const lines = markdown.split('\n').filter((line) => line.trim().length > 0)
  const toc = lines
    .filter((line) => line.startsWith('## '))
    .map((line) => line.replace(/^## /, ''))

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-5 text-sm dark:border-stone-800 dark:bg-stone-900">
          <p className="font-bold text-ink dark:text-white">Table of contents</p>
          <nav className="mt-3 grid gap-2 text-stone-600 dark:text-stone-300">
            {toc.map((item) => <a key={item} href={`#${slugify(item)}`} className="hover:text-ink dark:hover:text-white">{item}</a>)}
          </nav>
        </div>
      </aside>
      <article className="prose-content">
        {lines.map((line, index) => renderLine(line, index))}
      </article>
    </div>
  )
}

function renderLine(line: string, index: number) {
  if (line.startsWith('# ')) return <h1 key={index}>{line.replace(/^# /, '')}</h1>
  if (line.startsWith('## ')) {
    const text = line.replace(/^## /, '')
    return <h2 key={index} id={slugify(text)}>{text}</h2>
  }
  if (line.startsWith('### ')) return <h3 key={index}>{line.replace(/^### /, '')}</h3>
  if (line.startsWith('- ')) return <p key={index} className="pl-4 before:mr-2 before:content-['•']">{line.replace(/^- /, '')}</p>
  return <p key={index}>{line}</p>
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

