import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-2 ">
            <Link href="/krasnoe-bedstvie/map">
                <div className="relative group transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <div className="relative ">
                        <Image
                            src="/assets/images/nav-bedstvie.jpg"
                            className="rounded-lg filter blur-[1px] shadow-md group-hover:blur-none"
                            width={300}
                            height={300}
                            alt="Красное бедствие"
                            priority={true}
                        />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center text-white text-3xl font-bold -translate-y-10">
                        Красное бедствие
                    </div>
                </div>
            </Link>
        </main>
    )
}
