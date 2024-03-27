'use client';

import { getReportStatistics } from '@/lib/action';
import { useEffect, useState } from 'react';
import Loading from '../icons/Loading';
import { TransactionStatistic } from '@/lib/dataTypes';

const TransactionStatistic: React.FC<{ userId: number }> = ({ userId }) => {
  const [statistic, setStatistics] = useState<TransactionStatistic>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStatisticData = async () => {
    const statisticData: TransactionStatistic = await getReportStatistics(userId);

    setStatistics(statisticData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStatisticData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <article className="flex flex-col gap-4">
      {statistic && !isLoading && (
        <div className="grid grid-cols-2 grid-rows-2 text-[1.25rem] gap-4">
          <div className="col-span-full">
            Total Transactions(count):{' '}
            <span className="font-bold">{statistic?.totalTransactions}</span>
          </div>

          <div>
            Incomes(count): <span className="font-bold">{statistic?.incomeTransactions}</span>
          </div>
          <div>
            Expenses(count): <span className="font-bold">{statistic?.expenseTransactions}</span>
          </div>
          <div>
            Income(value): <span className="font-bold">{statistic?.transValues.incomeSum} $</span>
          </div>
          <div>
            Expenses(value):{' '}
            <span className="font-bold">{statistic?.transValues.expenseSum} $</span>
          </div>

          <div>
            First Trans:{' '}
            <span className="font-bold">
              {statistic?.firstTransactionDate?.toLocaleDateString()?.toString()}
            </span>
          </div>
          <div>
            Last Trans:{' '}
            <span className="font-bold">
              {statistic?.lastTransactionDate?.toLocaleDateString()?.toString()}
            </span>
          </div>
          <div>
            Timezone: <span className="font-bold">{statistic?.timeZone}</span>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="mt-24">
          <Loading />
        </div>
      )}
    </article>
  );
};

export default TransactionStatistic;
