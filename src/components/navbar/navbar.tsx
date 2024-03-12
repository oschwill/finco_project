'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import AddNavbar from './AddNavbar';

const NavBar: React.FC = () => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {showAddTransaction && <AddNavbar />}
      <footer className="w-full fixed z-20 bg-white bottom-0 flex justify-center border-y-2 border-gray-100">
        <section className="flex items-center justify-between w-[90%] pt-12 pb-12  ">
          <article className="relative w-[40px]">
            {pathname === '/home' ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-[1.5rem] font-bold">Home</p>
                <hr className="border border-primary w-[25px] text-center h-[4px] bg-primary" />
              </div>
            ) : (
              <Link href="/home">
                <Image src="/img/navbar/home.svg" alt="home icon" width={30} height={30} />
              </Link>
            )}
          </article>
          <article className="relative w-[40px]">
            {pathname === '/transaction' ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-[1.5rem] font-bold">Transaction</p>
                <hr className="border border-primary w-[25px] text-center h-[4px] bg-primary" />
              </div>
            ) : (
              <Link href="/transaction">
                <Image
                  src="/img/navbar/credit-card.svg"
                  alt="transaction icon"
                  width={30}
                  height={30}
                />
              </Link>
            )}
          </article>
          <article className="absolute z-30 top-[-22.5px] left-1/2 -translate-x-1/2 w-[40px]">
            {showAddTransaction ? (
              <div className="relative bg-white rounded-full w-[40px] h-[40px] flex justify-center items-center">
                <Image
                  src="/img/navbar/minus-circle.svg"
                  alt="add trans icon"
                  fill
                  objectFit="contain" // Passt das Bildverhältnis an, ohne es zu verzerren
                  onClick={() => setShowAddTransaction((cur) => !cur)}
                  className="bg-white rounded-full"
                />
              </div>
            ) : (
              <Image
                src="/img/navbar/plus-circle.svg"
                alt="add trans icon"
                width={40}
                height={40}
                onClick={() => setShowAddTransaction((cur) => !cur)}
              />
            )}
          </article>
          <article className="relative w-[40px]">
            <Link href="#">
              <Image src="/img/navbar/calendar.svg" alt="placeholder icon" width={30} height={30} />
            </Link>
          </article>
          <article className="relative w-[40px]">
            {pathname === '/reports' ? (
              <div className="flex flex-col justify-center items-center">
                <p className="text-[1.5rem] font-bold">Reports</p>
                <hr className="border border-primary w-[25px] text-center h-[4px] bg-primary" />
              </div>
            ) : (
              <Link href="/reports">
                <Image src="/img/navbar/pie-chart.svg" alt="reports icon" width={30} height={30} />
              </Link>
            )}
          </article>
        </section>
      </footer>
    </>
  );
};

export default NavBar;
