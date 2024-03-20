import { Suspense } from 'react';
import TransactionItem from './TransactionItem';
import { GroupedTransaction } from '@/lib/dataTypes';

const TransactionSection: React.FC<GroupedTransaction> = ({ headDay, headDate, data }) => {
  return (
    <article className="w-full flex flex-col gap-4">
      <div>
        <p className="text-[1.25rem]">{headDay}</p>
        <h2 className="text-[1.75rem] font-bold">{headDate}</h2>
      </div>
      <div className="flex flex-col gap-6">
        <Suspense fallback="is Loading...">
          {data &&
            data.map((item) => (
              <TransactionItem
                key={item.id}
                transaction_type={item.transaction_type}
                amount={item.amount}
                category={item.category}
                date={item.date}
                timezone={item.timezone}
              />
            ))}
        </Suspense>
      </div>
    </article>
  );
};

export default TransactionSection;
