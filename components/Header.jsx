'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header(){
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(()=>{ const saved = localStorage.getItem('ots-theme'); if(saved==='dark'){ document.documentElement.classList.add('dark'); setDark(true) } },[])
  const toggleTheme = ()=>{ const toDark = !dark; setDark(toDark); if(toDark) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); localStorage.setItem('ots-theme', toDark ? 'dark':'light') }
  return (
    <header className='bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-40'>
      <div className='max-w-5xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button aria-label='menu' onClick={()=>setOpen(true)} className='text-2xl'>☰</button>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-md flex items-center justify-center text-white font-bold'>OT</div>
            <div>
              <div className='font-semibold'>One Tool</div>
              <div className='text-xs text-slate-500'>Solutions</div>
            </div>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <nav className='hidden md:flex gap-4'>
            <Link href='/' className='text-slate-700 dark:text-slate-200'>Home</Link>
            <Link href='/ai' className='text-slate-700 dark:text-slate-200'>AI</Link>
            <Link href='/tools' className='text-slate-700 dark:text-slate-200'>Tools</Link>
            <Link href='/learn' className='text-slate-700 dark:text-slate-200'>Learn</Link>
          </nav>
          <button id='themeToggle' onClick={toggleTheme} className='px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800'>{dark ? '☀️' : '🌙'}</button>
        </div>
      </div>

      {open && (
        <div className='fixed inset-0 z-50'>
          <div onClick={()=>setOpen(false)} className='absolute inset-0 bg-black/40'></div>
          <aside className='relative bg-white dark:bg-slate-800 w-72 h-full p-4'>
            <button onClick={()=>setOpen(false)} className='mb-4'>✕</button>
            <nav className='flex flex-col gap-2'>
              <Link href='/' onClick={()=>setOpen(false)}>Home</Link>
              <Link href='/ai' onClick={()=>setOpen(false)}>Ask OTS AI</Link>
              <Link href='/tools' onClick={()=>setOpen(false)}>Tools</Link>
              <Link href='/learn' onClick={()=>setOpen(false)}>Learn</Link>
              <Link href='/about' onClick={()=>setOpen(false)}>About</Link>
              <Link href='/contact' onClick={()=>setOpen(false)}>Contact</Link>
              <Link href='/privacy' onClick={()=>setOpen(false)}>Privacy</Link>
              <Link href='/terms' onClick={()=>setOpen(false)}>Terms</Link>
              <Link href='/support' onClick={()=>setOpen(false)}>Support</Link>
            </nav>
          </aside>
        </div>
      )}
    </header>
  )
}
