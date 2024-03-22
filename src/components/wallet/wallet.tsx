'use client';

import Image from 'next/image';
import { IconTitle } from '@/lib/dataTypes';
import { Suspense, useEffect, useState } from 'react';
import { getIncomeOutcomeByUser } from '@/lib/action';

const Wallet: React.FC<IconTitle> = ({ trendingUpTitle, trendingDownTitle, userId }) => {
  const [financeData, setFinanceData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const transactionData = await getIncomeOutcomeByUser(userId);
      console.log(userId);

      setFinanceData(transactionData);
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <section className="w-[90%] flex flex-col gap-[10px] mt-[20px]">
        <h2 className="text-[2rem] font-bold mt-7 mb-8">Total wallet</h2>

        <div className="flex justify-center gap-5 w-full">
          {financeData && (
            <Suspense fallback="is Loading...">
              <div className="flex flex-col gap-2 bg-[#f7f7f7] p-5 rounded-xl w-full">
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    src="/img/home/income.svg"
                    alt="income icon"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-[1.5rem] font-light">{trendingUpTitle}</p>
                <p className="text-[2.5rem] font-bold">+ $ {financeData.incomeSum}</p>
              </div>
              <div className="flex flex-col gap-2 bg-[#f7f7f7] p-5 rounded-xl w-full">
                <div className="relative w-[100px] h-[100px]">
                  <Image
                    src="/img/home/expense.svg"
                    alt="income icon"
                    fill
                    className="object-cover"
                  />
                </div>

                <p className="text-[1.5rem] font-light">{trendingDownTitle}</p>
                <p className="text-[2.5rem] font-bold">- $ {financeData.expenseSum}</p>
              </div>
            </Suspense>
          )}
        </div>

        <div className="limit flex items-center justify-between bg-[#f7f7f7] p-6 mt-4 mb-16 rounded-[36px]">
          <div className="flex gap-8">
            <div>
              <Image src="/img/home/limit.svg" alt="limit icon" width={55} height={55} />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[1.5rem] font-light">Monthly spending limit</p>
              <p className="text-[1.5rem] font-bold">$ 6.000</p>
            </div>
          </div>
          <div className="pr-6">
            <Image
              src="/img/home/more-horizontal.svg"
              alt="edit limit icon"
              width={30}
              height={30}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Wallet;
