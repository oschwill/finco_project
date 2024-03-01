'use client';

import { registerUserForm } from '@/lib/clientAction';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import FormSubmitButton from '../buttons/FormSubmitButton';
import TermsAndService from './TermsAndService';

const RegisterForm: React.FC = () => {
  const [state, formAction] = useFormState(registerUserForm, undefined);
  const [showTerms, setShowTerms] = useState(false);

  const handleSetShowTerms = () => {
    setShowTerms((cur) => !cur);
  };

  return (
    <form className="mb-8 flex flex-col gap-8" action={formAction}>
      <div>
        <label htmlFor="name"></label>
        <input
          type="text"
          name="name"
          id="name"
          className={`${
            state?.error && state?.error.type === 'name' && 'border-red-600'
          } border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]`}
          placeholder="Name"
        />
      </div>
      <div>
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          id="email"
          className={`${
            state?.error && state?.error.type === 'email' && 'border-red-600'
          } border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]`}
          placeholder="Email"
        />
      </div>
      <div>
        <label htmlFor="password"></label>
        <input
          type="password"
          name="password"
          id="password"
          className={`${
            state?.error && state?.error.type === 'password' && 'border-red-600'
          } border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]`}
          placeholder="Password"
        />
      </div>
      <div>
        <label htmlFor="passwordRepeat"></label>
        <input
          type="password"
          name="passwordRepeat"
          id="passwordRepeat"
          className={`${
            state?.error && state?.error.type === 'passwordRepeat' && 'border-red-600'
          } border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]`}
          placeholder="Confirm password"
        />
      </div>
      <div className=" text-[1.5rem] flex items-center gap-6">
        <input
          type="checkbox"
          id="terms"
          name="terms"
          value="terms"
          className={`${
            state?.error &&
            state?.error.type === 'terms' &&
            'outline outline-1 outline-offset-[-1px] outline-red-600'
          } scale-150 checkbox`}
        />
        <label htmlFor="terms">
          Agree to our{' '}
          <span className="font-bold" onClick={handleSetShowTerms}>
            Terms and Service
          </span>
        </label>
      </div>
      <div className="relative">
        {state?.error && (
          <span className="absolute p-4 text-center bg-pink-300 text-red-900 w-full text-[1.5rem] font-bold">
            {state.error.message}
          </span>
        )}
      </div>
      <FormSubmitButton text="Register Now" />
      {showTerms && <TermsAndService onHandleSetShowTerms={handleSetShowTerms} />}
    </form>
  );
};

export default RegisterForm;
