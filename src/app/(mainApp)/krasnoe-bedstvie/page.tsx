'use client'
import { useRouter } from 'next/navigation'
import { useEffect, FC } from 'react'

const KrasnoeBedstviePage: FC = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/krasnoe-bedstvie/map')
    }, [router])

    return null
}

export default KrasnoeBedstviePage
