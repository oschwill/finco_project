'use client';

import { checkVerify } from '@/lib/action';
import { redirect } from 'next/dist/server/api-utils';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import SuccessBox from './SuccessBox';

interface verifyData {
  token: string;
  email: string;
}

const VerifyUserForm: React.FC<verifyData> = ({ token, email }) => {
  const [state, formAction] = useFormState(checkVerify, undefined);
  const [calculation, setCalculation] = useState({ numberOne: 0, numberTwo: 0, result: 0 });

  useEffect(() => {
    const numOne = Math.floor(Math.random() * 10);
    const numTwo = Math.floor(Math.random() * 10);
    setCalculation({
      numberOne: numOne,
      numberTwo: numTwo,
      result: numOne + numTwo,
    });
  }, [state?.error]);

  return (
    <>
      <form action={formAction}>
        <label htmlFor="result"></label>
        <input type="hidden" id="result" name="result" value={calculation.result} />
        <input type="hidden" id="token" name="token" value={token} />
        <input type="hidden" id="email" name="email" value={email} />
        <div className="flex flex-col gap-8">
          <label htmlFor="captcha" className="flex flex-col">
            Please solve the task:
            <span className="text-[2.5rem] bg-slate-300 text-center">{`${calculation.numberOne} + ${calculation.numberTwo}`}</span>
          </label>
          <input
            type="text"
            id="captcha"
            name="captcha"
            className="border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
          />
        </div>
        <div className="w-full">
          {state?.error && (
            <p className="p-4 bg-pink-300 text-red-950 font-bold text-center">{state.error}</p>
          )}
          <button
            type="submit"
            className={`mt-16 bg-gradient-to-b from-buttonBgGradientFrom to-buttonBgGradientTo p-8 rounded-[25px] text-[1.5rem] text-white w-full`}
          >
            Verify
          </button>
        </div>
      </form>
      {state?.success && <SuccessBox />}
    </>
  );
};

export default VerifyUserForm;
