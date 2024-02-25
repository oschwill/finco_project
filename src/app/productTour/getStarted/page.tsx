import Image from "next/image";
import Link from "next/link";

const GetStarted = () => {
  return (
    <div className="grid h-screen text-textColor place-items-center">
      <Image
        className="h-auto w-auto"
        priority={true}
        src="/GiftCard.svg"
        alt="Logo"
        width={200}
        height={200}
      />
      <div className="flex flex-col text-center items-center">
        <h1 className="text-2xl w-60 break-words mb-5">
          Analyze your spending
        </h1>
        <p className="w-80">
          Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
          incididunt et.
        </p>
      </div>

      <div className="flex w-full  justify-around">
        <button className="btn text-white px-10 bg-gradient-linear">
          <Link
            href={"/productTour/getStarted"}
            className="flex items-center gap-4 "
          >
            Get started
            <Image
              className="h-5 w5"
              src="/arrow.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default GetStarted;
