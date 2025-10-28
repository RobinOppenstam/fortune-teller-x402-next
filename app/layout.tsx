import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Fortune Teller - x402 Degen Oracle',
  description: 'Get your crypto fortune told with AI - powered by x402 micropayments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
