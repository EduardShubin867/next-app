import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
    weight: ['400', '700'], // Вы можете указать нужные начертания шрифта
    subsets: ['latin'], // Или другие нужные подмножества символов
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
            <body className={roboto.className}>
                <div className="container mx-auto">{children}</div>
            </body>
        </html>
    )
}
