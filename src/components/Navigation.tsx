import React, { FC } from 'react'
import Link from 'next/link'

interface NavItem {
    label: string
    href: string
}

const navItems: NavItem[] = [
    { label: 'Карта', href: 'map' },
    { label: 'Персонажи', href: 'characters' },
]

const Navigation: FC = ({}) => {
    return (
        <nav className="bg-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <Link href="/" className="font-bold text-xl">
                                My Website
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={`${item.href}`}
                                        className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
