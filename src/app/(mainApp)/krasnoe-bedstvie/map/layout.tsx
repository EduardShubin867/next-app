'use client'
import { FC, ReactNode } from 'react'
import { NewMarkerProvider } from '@/context/NewMarkerContext'

type Props = {
    children: ReactNode
}

const MainAppLayout: FC<Props> = ({ children }) => {
    return (
        <>
            <NewMarkerProvider>{children}</NewMarkerProvider>
        </>
    )
}
export default MainAppLayout
