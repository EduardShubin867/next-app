import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

const roboto = Roboto({
    weight: ['400', '700'],
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Интерактивная карта',
    description: 'Интерактивная карта',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.4.0/dist/leaflet.css" />

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />

                <Script src="https://kit.fontawesome.com/ebe06fd839.js"></Script>
            </head>
            <body className={roboto.className}>
                <div className="mx-auto w-full">{children}</div>
            </body>
        </html>
    );
}
