'use client';

import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { forgotPassword } from '@/lib/action';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

interface PasswordForgotState {
  isShown: boolean;
  hasSend: boolean;
  message: string;
}

interface ForgotPasswordProps {
  onSetShowPasswordForgot: React.Dispatch<React.SetStateAction<PasswordForgotState>>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onSetShowPasswordForgot }) => {
  const [state, formAction] = useFormState(forgotPassword, undefined);

  useEffect(() => {
    if (state?.hasSend) {
      onSetShowPasswordForgot({
        isShown: false,
        hasSend: true,
        message: 'password request has been sent',
      });

      const timeoutId = setTimeout(() => {
        onSetShowPasswordForgot((prevState) => ({
          ...prevState,
          hasSend: false,
        }));
      }, 5000);

      // Timer löschen falls das Komponent unmountet wird
      // return () => clearTimeout(timeoutId);
    }
  }, [state?.hasSend, onSetShowPasswordForgot]);

  return (
    <section className="w-full h-[200px] bg-inputBackColor flex flex-col justify-center items-center rounded-[10px]">
      <article className="w-[95%]">
        <p
          className="absolute top-2 right-3 text-red-800 font-bold text-[1.25rem]"
          onClick={() => {
            onSetShowPasswordForgot((prevState) => {
              return {
                ...prevState,
                isShown: !prevState.isShown,
              };
            });
          }}
        >
          close
        </p>
        <p className="text-[1.5rem] mt-16">Please enter your e-mail address</p>
        <form action={formAction} className="w-full justify-around flex flex-col">
          <div className="">
            <label htmlFor="email"></label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="your email..."
              className="border-2 border-inputBorderColor text-[1.5rem] p-4  w-full rounded-[25px]"
            />
          </div>
          <FormSubmitButton text="Send" />
        </form>

        {state?.error && (
          <p className="absolute bottom-[30%] left-0 bg-pink-300 text-red-900 text-[1.5rem] p-2 w-full text-center">
            {state.error}
          </p>
        )}
      </article>
    </section>
  );
};

export default ForgotPassword;
