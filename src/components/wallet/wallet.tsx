const Wallet = () => {
  return (
    <>
      <section className='wallet mx-6'>
        <h2 className='text-lg font-bold mt-7 mb-8'>Total wallet</h2>

        <div className='wrapper my-0 mx-auto'>
          <div className='flex justify-center gap-5'>
            <div className='income flex flex-col bg-[#f7f7f7] p-5 rounded-xl'>
              <div>
                <img src='/img/home/income.svg' alt='income icon' />
              </div>
              <p className='text-sm font-light'>Income</p>
              <p className='font-bold'>+ $10.000</p>
            </div>
            <div className='expense flex flex-col bg-[#f7f7f7] p-5 rounded-xl'>
              <div>
                <img src='/img/home/expense.svg' alt='expense icon' />
              </div>
              <p className='text-sm font-light'>Expense</p>
              <p className='font-bold'>- $10.000</p>
            </div>
          </div>

          <div className='limit flex items-center justify-between bg-[#f7f7f7] p-4 mt-4 mb-16 rounded-[36px]'>
            <div className='flex gap-3'>
              <div>
                <img src='/img/home/limit.svg' alt='limit icon' />
              </div>
              <div className='flex flex-col justify-center'>
                <p className='text-xs font-light'>Monthly spending limit</p>
                <p className='text-sm font-bold'>$ 6.000</p>
              </div>
            </div>
            <div>
              <img src='/img/home/more-horizontal.svg' alt='edit limit icon' />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wallet;
