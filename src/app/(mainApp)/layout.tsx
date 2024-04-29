'use client';
import { FC, ReactNode } from 'react';
import Navigation from '@/app/components/Navigation';
import StoreProvider from '@/app/StoreProvider';

type MainAppLayoutProps = {
    children: ReactNode;
};

const MainAppLayout: FC<MainAppLayoutProps> = ({ children }) => {
    return (
        <>
            <StoreProvider>
                <Navigation />
                {children}
            </StoreProvider>
        </>
    );
};
export default MainAppLayout;
