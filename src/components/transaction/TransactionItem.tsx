import Image from 'next/image';
import { Transactions } from '@/lib/dataTypes';
import { formatCustomDate } from '@/lib/functionHelper';

const TransactionItem: React.FC<Transactions> = ({
  transaction_type,
  amount,
  category,
  date,
  timezone,
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          src={`${
            transaction_type === 'income' ? '/img/trending-up.svg' : '/img/trending-down.svg'
          }`}
          alt={`${transaction_type === 'income' ? 'trending up icon' : 'trending down icon'}`}
          width={48}
          height={48}
        />
        <div className="">
          <p className="text-[1.5rem] font-bold">{category}</p>
          <p className="text-[1rem]">{formatCustomDate(date, timezone)}</p>
        </div>
      </div>

      <p
        className={`${
          transaction_type === 'income' ? 'text-linkColor' : 'text-uploadButtonGradientTo'
        }  text-[1.5rem] font-bold`}
      >
        {transaction_type === 'income' ? '+' : '-'}$ {amount}
      </p>
    </div>
  );
};

export default TransactionItem;
