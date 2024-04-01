'use client';

import Image from 'next/image';
import FormSubmitButton from '../buttons/FormSubmitButton';
import React, { useState } from 'react';
import { isValidSixteenDigitNumber } from '@/lib/functionHelper';
import { changeCreditCardNumber } from '@/lib/clientAction';

const NoCreditCardMessage: React.FC<{ userId: number }> = ({ userId }) => {
  const [error, setError] = useState(false);

  const handleCreditCardInput = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(false);
    event.preventDefault();
    const form = event.currentTarget;
    const creditCardInput = form.elements.namedItem('creditCard') as HTMLInputElement;

    if (!creditCardInput.value || !isValidSixteenDigitNumber(creditCardInput.value)) {
      setError(true);
      return;
    }

    await changeCreditCardNumber(creditCardInput.value, userId, setError);
  };

  return (
    <div className="fixed h-[100vh] w-[100vw] top-0 left-0 bg-transparentBGColorSec z-20 flex justify-center">
      <div className="text-[1.75rem] text-white font-bold w-[90%] flex flex-col items-center gap-6">
        <Image src="/img/Logo.svg" width={200} height={200} alt="Logo" />
        <p>To continue, you need a valid Credit Card. Please fill in your Credit Card number. </p>
        <form className="flex flex-col w-full gap-4" onSubmit={handleCreditCardInput}>
          <div>
            <label htmlFor="creditCard"></label>
            <input
              type="text"
              name="creditCard"
              id="creditCard"
              className="text-black border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
            />
          </div>
          <div className="relative">
            {error && (
              <p className=" text-red-900 bg-red-300 p-2 absolute top-0 w-full">
                You need a valid Credit Card Number
              </p>
            )}
          </div>
          <FormSubmitButton text="Continue" />
        </form>
      </div>
    </div>
  );
};

export default NoCreditCardMessage;
