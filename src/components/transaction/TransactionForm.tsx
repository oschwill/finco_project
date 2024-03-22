'use client';

import { useEffect, useRef, useState } from 'react';
import Arrow from '../icons/Arrow';
import CategoryList from './CategoryList';
import { lockFutureDays } from '@/lib/functionHelper';
import FormSubmitButton from '../buttons/FormSubmitButton';
import { useFormState } from 'react-dom';
import { addTransaction } from '@/lib/clientAction';

interface Transaction {
  transactionType: string;
  text: string;
  userId: number;
}

const TransactionForm: React.FC<Transaction> = ({ transactionType, text, userId }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryList, setShowCategoryList] = useState(false);
  const [state, formAction] = useFormState(addTransaction, undefined);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formRef.current && state?.success?.type === 'success') {
      formRef.current.reset();
      setCategory('');
      setAmount('');
    }
  }, [state?.success]);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Nur 2 Nachkommastellen erlauben
    if (/^\d*(\.\d{0,2})?$/.test(value)) {
      setAmount(value);
    }
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleShowCategoryList = () => {
    setShowCategoryList((cur) => !cur);
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowCategoryList(false);
  };

  return (
    <section className="w-[90%] mb-[100px]">
      <article>
        <form ref={formRef} className="mb-8 flex flex-col gap-8" action={formAction}>
          <input type="hidden" name="transaction_type" value={transactionType} />
          <input type="hidden" name="user_id" value={userId} />
          <div className="flex flex-col gap-4 relative">
            <label htmlFor="amount" className="text-[1.5rem] font-bold">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full p-8 pl-16 rounded-[25px] text-[2rem] font-bold bg-inputBackColor ${
                state?.error && state?.error.type === 'amount' && 'border-2 border-red-600'
              }`}
            />
            <span
              className={`absolute text-[2rem] font-bold bottom-[20px] left-6 ${
                state?.error && state?.error.type === 'amount' && 'bottom-[22px]'
              }`}
            >
              €
            </span>
          </div>
          <div className="flex flex-col gap-4 relative">
            <label htmlFor="category" className="text-[1.5rem] font-bold">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              className={`w-full p-8 rounded-[25px] text-[1.5rem] font-bold bg-inputBackColor ${
                state?.error && state?.error.type === 'category' && 'border-2 border-red-600'
              }`}
            />
            <div className="absolute bottom-[20px] right-[7.5px]">
              <Arrow
                showCategoryList={showCategoryList}
                handleShowCategoryList={handleShowCategoryList}
              />
            </div>
            {showCategoryList && <CategoryList onSelectCategory={handleSelectCategory} />}
          </div>
          <div className="flex flex-col gap-4 relative">
            <label htmlFor="category" className="text-[1.5rem] font-bold">
              Date/Time
            </label>
            <input
              {...lockFutureDays()}
              type="datetime-local"
              id="date"
              name="date"
              className={`w-full p-8 rounded-[25px] text-[1.5rem] font-bold bg-inputBackColor ${
                state?.error && state?.error.type === 'date' && 'border-2 border-red-600'
              }`}
            />
          </div>
          <div className="relative">
            {state?.error && (
              <span className="absolute p-4 text-center bg-pink-300 text-red-900 w-full text-[1.5rem] font-bold">
                {state.error.message}
              </span>
            )}
          </div>
          <FormSubmitButton text={text} />
        </form>
      </article>
    </section>
  );
};

export default TransactionForm;
