import BalanceIcons from '@/components/balanceIcons/balanceIcons';
import Calendar from '@/components/icons/Calendar';
import SearchGlass from '@/components/icons/SearchGlass';
import NavBar from '@/components/navbar/navbar';
import TransactionSection from '@/components/transaction/TransactionSection';
import { getAllTransactions } from '@/lib/action';
import { auth } from '@/lib/auth';
import { Suspense } from 'react';

const AllTransactions = async () => {
  const { user } = await auth();
  const userId = (user as any).id;

  // Hole alle transactions
  const transactionData = await getAllTransactions(userId);
  console.log(transactionData);

  return (
    <main className="flex flex-col items-center gap-6">
      <section className="w-[90%] flex">
        <article className="flex justify-between items-center w-full">
          <h1 className="text-[2.5rem] font-bold">All transactions</h1>
          <div className="flex gap-4 items-center">
            <div className="bg-inputBackColor rounded-full p-4">
              <SearchGlass />
            </div>
            <div className="bg-inputBackColor rounded-full p-4">
              <Calendar />
            </div>
          </div>
        </article>
      </section>
      <section className="w-[90%] flex my-5">
        <BalanceIcons trendingUpTitle="Income" trendingDownTitle="Expense" userId={userId} />
      </section>
      <section className="w-[90%] flex flex-col gap-6 my-5 mb-[150px]">
        <Suspense fallback="is Loading...">
          {transactionData && transactionData.length > 0 ? (
            transactionData.map((transData, index) => {
              return (
                <TransactionSection
                  key={index}
                  headDay={transData.headDay}
                  headDate={transData.headDate}
                  data={transData.data}
                />
              );
            })
          ) : (
            <div className="flex justify-center items-center h-48">
              <p className="text-[1.5rem]">No Data available</p>
            </div>
          )}
        </Suspense>
      </section>
      <NavBar />
    </main>
  );
};

export default AllTransactions;
