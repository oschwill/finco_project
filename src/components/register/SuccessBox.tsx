import Link from 'next/link';

const SuccessBox = () => {
  return (
    <section className="fixed top-0 left-0 bg-slate-400 bg-opacity-90 h-full w-full flex justify-center">
      <article className="flex flex-col items-center w-[95%] mt-32 gap-32">
        <h2 className="text-[2rem] text-white">
          Congratulations, you have registered succesfully!
        </h2>
        <Link href="/login" className="underline text-blue-700 font-bold text-[2rem]">
          Go to Login
        </Link>
      </article>
    </section>
  );
};

export default SuccessBox;
