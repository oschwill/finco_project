import Image from 'next/image';
import Link from 'next/link';

const GetStarted = () => {
  return (
    <div className="flex flex-col justify-around h-screen text-textColor place-items-center">
      <Image priority={true} src="/GiftCard.svg" alt="Logo" width={250} height={250} />
      <div className="flex flex-col text-center items-center">
        <h1 className="break-words mb-5 text-[2rem]">Analyze your spending</h1>
        <p className="w-80 text-[1.25rem]">
          Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt et.
        </p>
      </div>

      <div className="flex w-full  justify-around">
        <button className="btn text-white px-10 bg-gradient-linear text-[1.25rem]">
          <Link href={'/login'} className="flex items-center gap-4 ">
            Get started
            <Image className="h-5 w5" src="/arrow.svg" alt="arrow" width={20} height={20} />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
