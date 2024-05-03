import { FC, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
    children: ReactNode;
    color: 'blue' | 'green' | 'cyan' | 'red';
    onClick: (event: React.SyntheticEvent) => void;
}

const CustomButton = ({ children, color, onClick }: Props) => {
    return (
        <button
            className={clsx(
                `mx-1 mb-2 rounded-lg border px-5 py-2.5 text-lg font-medium hover:text-white focus:outline-none focus:ring-4`,
                color === 'blue' && `border-blue-700 text-blue-700 hover:bg-blue-800 focus:ring-blue-300`,
                color === 'green' && `border-green-700 text-green-700 hover:bg-green-800 focus:ring-green-300`,
                color === 'cyan' && `border-cyan-700 text-cyan-700 hover:bg-cyan-800 focus:ring-cyan-300`,
                color === 'red' && `border-red-700 text-red-700 hover:bg-red-800 focus:ring-red-300`
            )}
            onClick={(event) => onClick(event)}
        >
            {children}
        </button>
    );
};

export default CustomButton;
