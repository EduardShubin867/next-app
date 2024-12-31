'use client';
import { Avatar, Dropdown } from 'flowbite-react';
import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { FC } from 'react';

const HiHome = dynamic(
  () => import('react-icons/hi').then((mod) => mod.HiHome),
  {
    ssr: false,
  }
);

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Карта', href: 'map' },
  { label: 'Персонажи', href: 'characters' },
];

const Navigation: FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="fixed inset-x-0 top-0 z-[2000] h-[6vh] w-full bg-gray-200/75 shadow-xl backdrop-blur-sm">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex w-full items-center">
            <div className="shrink-0">
              <Link href="/" className="text-xl font-bold">
                <HiHome className="transition duration-300 ease-in-out hover:scale-125" />
              </Link>
            </div>

            <div className="ml-8 flex items-center space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={`${item.href}`}
                  className="group relative rounded-md px-3 py-2 text-sm font-medium transition duration-300 ease-in-out"
                >
                  <span
                    className={`absolute inset-0 rounded-md bg-gray-700 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100`}
                  ></span>
                  <span className="relative z-10 transition duration-300 ease-in-out group-hover:text-white">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
            {session && (
              <div className="ml-auto flex h-full justify-center align-middle">
                <Dropdown
                  label={
                    session.user.image ? (
                      <Avatar
                        className="h-full"
                        img={session.user.image}
                        alt={`Avatar of ${session.user.name}`}
                        size="sm"
                        rounded
                      />
                    ) : (
                      <div className="rounded-full bg-slate-500" />
                    )
                  }
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{session.user.name}</span>
                    <span className="block truncate text-sm font-medium">
                      {session.user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item>
                    <button onClick={() => signOut()}>Sign out</button>
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
