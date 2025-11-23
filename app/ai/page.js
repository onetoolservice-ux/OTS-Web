'use client'
import { useState } from 'react'

export default function AIPage(){
  const [q,setQ] = useState('')
  const [out,setOut] = useState('Demo responses appear here.')
  const ask = ()=>{ if(!q) return setOut('Please type a question.'); setOut('Generating (demo)...'); setTimeout(()=> setOut(`Demo answer for: "${q}"`),800); }
  return (
    <section>
      <div className='rounded-xl bg-white shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-2'>Ask OTS AI</h2>
        <div className='flex gap-3 mb-3'>
          <input value={q} onChange={e=>setQ(e.target.value)} className='flex-1 border rounded px-3 py-2' placeholder='Ask anything...' />
          <button onClick={ask} className='bg-blue-600 text-white px-4 py-2 rounded'>Ask</button>
        </div>
        <div className='p-4 bg-slate-50 rounded'>{out}</div>
      </div>
    </section>
  )
}
