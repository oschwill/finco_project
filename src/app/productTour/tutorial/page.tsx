import Image from 'next/image';
import Link from 'next/link';

const Tutorial = () => {
  return (
    <main className="flex flex-col justify-around h-screen text-textColor place-items-center w-full">
      <Image priority={true} src="/BankCard.svg" alt="Logo" width={250} height={250} />
      <div className="flex flex-col text-center items-center w-full">
        <h1 className="text-[2rem] break-words mb-5">Track your spend and income</h1>
        <p className="w-80 text-[1.25rem]">
          Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.
        </p>
      </div>
      <div className="flex w-full  justify-around">
        <button className="btn text-white text-[1.25rem] px-10 bg-gradient-linear">
          <Link href={'/login'}>Skip</Link>
        </button>

        <button className="btn text-white px-10 bg-gradient-linear text-[1.25rem]">
          <Link href={'/productTour/getStarted'} className="flex items-center gap-4 ">
            Next
            <Image className="h-5 w5" src="/arrow.svg" alt="arrow" width={20} height={20} />
          </Link>
        </button>
      </div>
    </main>
  );
};

export default Tutorial;
