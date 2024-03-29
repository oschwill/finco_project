'use client';

import { UserCredentials } from '@/lib/dataTypes';
import BalanceIcons from '../trendingIcons/BalanceIcons';
import SearchTransaction from './SearchTransaction';
import TransactionOutput from './TransactionOutput';
import { useEffect, useState } from 'react';
import { getAllTransactions, searchTransactionByValue } from '@/lib/action';
import Loading from '../icons/Loading';

const GlobalTransaction: React.FC<UserCredentials> = ({ userId }) => {
  const [transactionData, setTransactionData] = useState(null);
  const [searchDate, setSearchDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllTransactions = async () => {
    setIsLoading(true);
    const transactionData = await getAllTransactions(userId);

    setTransactionData(transactionData);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!transactionData) {
      fetchAllTransactions();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, transactionData]);

  const handleInputSearch = async (input: string, date: Date = null) => {
    if (!input && !date) {
      return;
    }

    setIsLoading(true);

    const searchData = await searchTransactionByValue(userId, input, date);
    setTransactionData(searchData);
    setIsLoading(false);
  };

  return (
    <>
      <section className="w-[90%] flex flex-col gap-4">
        <article className="flex justify-between items-center w-full">
          <SearchTransaction handleInputSearch={handleInputSearch} />
        </article>
        <article className="ml-auto mr-auto">
          <p className="text-linkColor text-[1.25rem] font-bold" onClick={fetchAllTransactions}>
            VIEW ALL
          </p>
        </article>
      </section>
      <section className="w-[90%] flex my-5">
        <BalanceIcons
          trendingUpTitle="Income"
          trendingDownTitle="Expense"
          userId={userId}
          category="finance"
        />
      </section>
      {!isLoading ? (
        <TransactionOutput transactionData={transactionData} />
      ) : (
        <section className="w-[90%] flex flex-col gap-6 my-5 mb-[150px]">
          <Loading />
        </section>
      )}
    </>
  );
};

export default GlobalTransaction;
