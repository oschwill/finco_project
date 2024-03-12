import Link from 'next/link';

const AddNavbar = () => {
  return (
    <section className="fixed top-0 bg-transparentBGColor h-full w-full">
      <article className="relative w-full h-full">
        <div className="absolute left-1/2 -translate-x-1/2 w-[200px] bottom-[130px] z-20">
          <div className="h-[120px] p-4 bg-white w-[30%] min-w-[200px] flex flex-col justify-around text-center  mx-auto my-0 rounded-[25px]">
            <Link href="/transaction/income">
              <span className="text-[1.5rem] font-bold">Income</span>
            </Link>
            <hr />
            <Link href="/transaction/expense">
              <span className="text-[1.5rem] font-bold">Expenses</span>
            </Link>
          </div>
          <div className=" h-12 w-10 rotate-45 bg-white mt-[-17.5px] relative mx-auto my-0 rounded-[0_0_5px_0]"></div>
        </div>
      </article>
    </section>
  );
};

export default AddNavbar;
