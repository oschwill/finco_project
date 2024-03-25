'use client';

import { getIncomeOutcomeByUser, getStartCurrentCapitalByUser } from '@/lib/action';
import Image from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { IconTitle, IncomeOutcomeResult, StartCurrentCapitalResult } from '@/lib/dataTypes';
import Loading from '../icons/Loading';
import TrendingIcon from '../icons/TrendingIcon';

type FinanceDataType = IncomeOutcomeResult | StartCurrentCapitalResult;

const BalanceIcons: React.FC<IconTitle> = ({
  trendingUpTitle,
  trendingDownTitle,
  userId,
  category,
}) => {
  const [financeData, setFinanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let transactionData: IncomeOutcomeResult | StartCurrentCapitalResult;

      switch (category) {
        case 'finance':
          {
            transactionData = await getIncomeOutcomeByUser(userId);
          }
          break;
        case 'capital':
          {
            transactionData = await getStartCurrentCapitalByUser(userId);
          }
          break;

        default:
          break;
      }

      setFinanceData(transactionData);
      setIsLoading(false);
    };

    fetchData();
  }, [userId, category]);

  const isIncomeOutcomeResult = (data: FinanceDataType): data is IncomeOutcomeResult => {
    return (data as IncomeOutcomeResult).incomeSum !== undefined;
  };

  return (
    <article className="balance-icons w-full">
      {!isLoading && financeData ? (
        <Suspense fallback="is Loading...">
          <div className="wrapper grid grid-cols-2 gap-6 text-[1.25rem]">
            <TrendingIcon
              image="/img/trending-up.svg"
              trendingUpTitle={trendingUpTitle}
              value={
                isIncomeOutcomeResult(financeData)
                  ? financeData.incomeSum
                  : financeData.startCapital
              }
            />
            <TrendingIcon
              image={
                isIncomeOutcomeResult(financeData)
                  ? '/img/trending-down.svg'
                  : financeData.currentCapital >= financeData.startCapital
                  ? '/img/trending-up.svg'
                  : '/img/trending-down.svg'
              }
              trendingUpTitle={trendingDownTitle}
              value={
                isIncomeOutcomeResult(financeData)
                  ? financeData.expenseSum
                  : financeData.currentCapital
              }
            />
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
