"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("hello");
    setTimeout(() => {
      router.push("/productTour/tutorial");
    }, 2000);
  });

  return (
    <div className="grid h-screen place-items-center">
      <Image src="/Logo.svg" alt="Logo" width={200} height={200} />
    </div>
  );
};

export default SplashScreen;
