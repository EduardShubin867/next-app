import * as React from 'react'
import 'tailwindcss/tailwind.css'

export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded shadow-xl">
                <h1 className="text-6xl text-red-500 font-bold">404</h1>
                <p className="text-gray-500 mt-4 text-xl">
                    Страница не найдена
                </p>
            </div>
        </div>
    )
}
