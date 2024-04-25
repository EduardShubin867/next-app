import * as React from 'react';
import 'tailwindcss/tailwind.css';

export interface INotFoundProps {}

export default function NotFound(props: INotFoundProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded bg-white p-8 shadow-xl">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-500">Страница не найдена</p>
      </div>
    </div>
  );
}
