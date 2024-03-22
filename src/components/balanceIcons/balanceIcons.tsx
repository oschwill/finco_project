'use client';

import { getIncomeOutcomeByUser } from '@/lib/action';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { IconTitle } from '@/lib/dataTypes';
import Loading from '../icons/Loading';

const BalanceIcons: React.FC<IconTitle> = ({ trendingUpTitle, trendingDownTitle, userId }) => {
  const [financeData, setFinanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const transactionData = await getIncomeOutcomeByUser(userId);

      setFinanceData(transactionData);
      setIsLoading(false);
    };

    fetchData();
  }, [userId]);

  return (
    <article className="balance-icons w-full">
      {!isLoading && financeData ? (
        <Suspense fallback="is Loading...">
          <div className="wrapper grid grid-cols-2 gap-6 text-[1.25rem]">
            <div className="flex items-center gap-3 bg-[#f7f7f7] p-3 rounded-[36px]">
              <div className="flex">
                <Image src="/img/trending-up.svg" alt="trending up icon" width={48} height={48} />
              </div>
              <div className="flex flex-col">
                <p className="font-light">{trendingUpTitle}</p>
                <p className="font-bold">+$ {financeData.incomeSum} </p>
              </div>
            </div>

            <div className="flex gap-3 items-center bg-[#f7f7f7] p-3 rounded-[36px]">
              <div className="flex">
                <Image src="/img/trending-down.svg" alt="trending up icon" width={48} height={48} />
              </div>
              <div className="flex flex-col">
                <p className="font-light">{trendingDownTitle}</p>
                <p className="font-bold">-$ {financeData.expenseSum}</p>
              </div>
            </div>
          </div>
        </Suspense>
      ) : (
        <div className="text-center">
          <p>Is Loading...</p>
        </div>
      )}
    </article>
  );
};

export default BalanceIcons;
