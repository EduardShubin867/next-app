import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-2">
      <Link href="/map">
        <div className="group relative transition-all duration-300 hover:scale-105 hover:shadow-xl">
          <div className="relative">
            <Image
              src="/assets/images/nav-bedstvie.jpg"
              className="rounded-lg shadow-md blur-[1px] group-hover:blur-none"
              width={300}
              height={300}
              alt="Красное бедствие"
              priority={true}
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex -translate-y-10 items-center justify-center text-3xl font-bold text-white">
            Карта
          </div>
        </div>
      </Link>
    </main>
  );
}
