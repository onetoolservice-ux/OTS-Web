import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'One Tool',
  description: 'One Tool — AI + Productivity'
}

export default function RootLayout({ children }){
  return (
    <html lang="en">
      <body className='bg-gray-50 text-slate-900'>
        <Header />
        <main className='max-w-5xl mx-auto p-6'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
