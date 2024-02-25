'use client';

import { loginUser } from '@/lib/action';
import React from 'react';
import { useFormState } from 'react-dom';

const LoginForm: React.FC = () => {
  const [state, formAction] = useFormState(loginUser, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div>
        <label htmlFor="email"></label>
        <input
          type="text"
          name="email"
          id="email"
          className="border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          className="border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
          placeholder="Password"
        />
      </div>
      <div className="flex justify-end">
        <p className="text-[1.5rem]">Forgot Password?</p>
      </div>
      <div className="relative w-full">
        {state?.error && (
          <span className="absolute p-4 text-center bg-pink-300 text-red-900 w-full text-[1.5rem] font-bold">
            {state.error}
          </span>
        )}
      </div>
      <button className="mt-16 bg-gradient-to-b from-buttonBgGradientFrom to-buttonBgGradientTo p-8 rounded-[25px] text-[1.5rem] text-white">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
