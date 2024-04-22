'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function KrasnoeBedstviePage() {
    const router = useRouter()

    useEffect(() => {
        router.push('/krasnoe-bedstvie/map')
    }, [router])

    return null
}
