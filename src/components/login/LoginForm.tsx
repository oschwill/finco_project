'use client';

import { loginUser } from '@/lib/action';
import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import FormSubmitButton from '../buttons/FormSubmitButton';
import ForgotPassword from './password_forgot/ForgotPassword';
import { StaticZoomInDiv } from '@/lib/animations/animationContainer';

const LoginForm: React.FC = () => {
  const queryString = window.location.search;

  const [state, formAction] = useFormState(loginUser, undefined);
  const [showPasswordForgot, setShowPasswordForgot] = useState({
    isShown: false,
    hasSend: false,
    message: null,
  });

  useEffect(() => {
    const query = new URLSearchParams(queryString);
    if (query.get('registered')) {
      setShowPasswordForgot((prevState) => ({
        ...prevState,
        hasSend: true,
        message: 'Please check your email for verification',
      }));
    }
  }, [queryString]);

  return (
    <>
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
        <div className="flex justify-end relative">
          <p
            className="text-[1.5rem]"
            onClick={() => {
              setShowPasswordForgot((prevState) => {
                return {
                  ...prevState,
                  isShown: !prevState.isShown,
                };
              });
            }}
          >
            Forgot Password?
          </p>
        </div>
        <div className="relative w-full">
          {showPasswordForgot?.hasSend && (
            <span className="absolute p-4 bottom-0 text-center bg-green-300 text-green-950 w-full text-[1.5rem] font-bold">
              {showPasswordForgot.message}
            </span>
          )}
          {state?.error && (
            <span className="absolute p-4 top-[10px]  text-center bg-pink-300 text-red-900 w-full text-[1.5rem] font-bold">
              {state.error}
            </span>
          )}
        </div>
        <FormSubmitButton text="Login" />
      </form>
      <div className="fixed w-full bottom-[15%] left-0">
        {showPasswordForgot.isShown && (
          <StaticZoomInDiv>
            <ForgotPassword onSetShowPasswordForgot={setShowPasswordForgot} />
          </StaticZoomInDiv>
        )}
      </div>
    </>
  );
};

export default LoginForm;
