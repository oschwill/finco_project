'use client';

import { changeUserPassword } from '@/lib/action';
import { useFormState } from 'react-dom';
import FormSubmitButton from '../buttons/FormSubmitButton';

const ChangePassword: React.FC = () => {
  const [state, formAction] = useFormState(changeUserPassword, undefined);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-[1.5rem] text-center">Change Password</h2>
      <form action={formAction} className="flex flex-col gap-8">
        <div>
          <label htmlFor="oldPassword"></label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            className="border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
            placeholder="old Password"
          />
        </div>
        <div>
          <label htmlFor="newPassword"></label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            className="border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
            placeholder="new Password"
          />
        </div>
        <div>
          <label htmlFor="repeatNewPassword"></label>
          <input
            type="password"
            name="repeatNewPassword"
            id="repeatNewPassword"
            className="border-2 w-full border-inputBorderColor p-6 rounded-[25px] text-[1.5rem]"
            placeholder="repeat new Password"
          />
        </div>
        <div className="relative">
          {state?.error && (
            <span className="absolute p-4 top-0  text-center bg-pink-300 text-red-900 w-full text-[1.5rem] font-bold">
              {state.error}
            </span>
          )}
          {state?.success && (
            <span className="absolute p-4 top-0  text-center bg-green-300 text-green-950 w-full text-[1.5rem] font-bold">
              {state.success}
            </span>
          )}
        </div>
        <FormSubmitButton text="Change" />
      </form>
    </div>
  );
};

export default ChangePassword;
