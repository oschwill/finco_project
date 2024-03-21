'use client';

import { Suspense } from 'react';
import TransactionSection from './TransactionSection';
import { GroupedTransaction } from '@/lib/dataTypes';

interface TransactionData {
  transactionData: GroupedTransaction[];
}

const TransactionOutput: React.FC<TransactionData> = ({ transactionData }) => {
  return (
    <section className="w-[90%] flex flex-col gap-6 my-5 mb-[150px]">
      <Suspense fallback="is Loading...">
        {transactionData && transactionData.length > 0 ? (
          transactionData.map((transData: GroupedTransaction, index) => {
            return (
              <TransactionSection
                key={index}
                headDay={transData.headDay}
                headLine={transData.headLine}
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
  );
};

export default TransactionOutput;
