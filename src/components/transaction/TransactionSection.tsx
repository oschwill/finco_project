import { Suspense } from 'react';
import TransactionItem from './TransactionItem';
import { GroupedTransaction } from '@/lib/dataTypes';

const TransactionSection: React.FC<GroupedTransaction> = ({ headDay, headLine, data }) => {
  return (
    <article className="w-full flex flex-col gap-4">
      <div>
        {headDay && <p className="text-[1.25rem]">{headDay}</p>}
        <h2 className="text-[1.75rem] font-bold">{headLine}</h2>
      </div>
      <div className="flex flex-col gap-6">
        <Suspense fallback="is Loading...">
          {data && data.length > 0 ? (
            data.map((item) => (
              <TransactionItem
                key={item.id}
                transaction_type={item.transaction_type}
                amount={item.amount}
                category={item.category}
                date={item.date}
                timezone={item.timezone}
              />
            ))
          ) : (
            <p className="text-center text-[1.25rem]">No Data vailable</p>
          )}
        </Suspense>
      </div>
    </article>
  );
};

export default TransactionSection;
