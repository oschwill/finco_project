'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/productTour/tutorial');
    }, 3000);
  });

  return (
    <div className="grid h-screen place-items-center">
      <Image src="/img/Logo.svg" alt="Logo" width={200} height={200} className="animate-bounce" />
    </div>
  );
};

export default Home;
