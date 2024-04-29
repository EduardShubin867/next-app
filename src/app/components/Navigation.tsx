'use client';
import React, { FC } from 'react';
import Link from 'next/link';
// import { HiHome } from 'react-icons/hi2'
import dynamic from 'next/dynamic';

const HiHome = dynamic(() => import('react-icons/hi').then((mod) => mod.HiHome), {
    ssr: false,
});

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'Карта', href: 'map' },
    { label: 'Персонажи', href: 'characters' },
];

const Navigation: FC = () => {
    return (
        <nav className="w-full bg-gray-200 bg-opacity-75 shadow-xl backdrop-blur-sm">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <Link href="/" className="text-xl font-bold">
                                <HiHome />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={`${item.href}`}
                                        className=" rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white"
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
    );
};

export default Navigation;
