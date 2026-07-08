'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('theme')
    const enabled = saved === 'dark'
    setDark(enabled)
    document.documentElement.classList.toggle('dark', enabled)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    window.localStorage.setItem('theme', next ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', next)
  }

  return (
    <button onClick={toggle} aria-label="Toggle dark mode" className="grid size-10 place-items-center rounded-xl border border-stone-200 bg-white text-ink dark:border-stone-700 dark:bg-stone-900 dark:text-white">
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

