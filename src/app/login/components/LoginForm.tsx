'use client';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

const LoginForm = () => {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const { pending } = useFormStatus();

    return (
        <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold">Вход в систему</h2>
            <form action={dispatch} className="space-y-4">
                <div>
                    <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                        Имя пользователя
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите имя пользователя"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                        Пароль
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите пароль"
                    />
                </div>
                <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                    {errorMessage && (
                        <>
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        </>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={pending}
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
