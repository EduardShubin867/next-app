'use client'
import { FC, ReactNode } from 'react'
import Navigation from '@/components/Navigation'

type MainAppLayoutProps = {
    children: ReactNode
}

const MainAppLayout: FC<MainAppLayoutProps> = ({ children }) => {
    return (
        <>
            <Navigation />
            {children}
        </>
    )
}
export default MainAppLayout
