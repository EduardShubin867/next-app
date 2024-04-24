import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Интерактивная карта',
    description: 'Интерактивная карта',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head></head>
            <body className={roboto.className}>
                <div className="mx-auto w-full">{children}</div>
            </body>
        </html>
    )
}
