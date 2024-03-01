import { useFormStatus } from 'react-dom';

const FormSubmitButton = ({ text }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`mt-16 bg-gradient-to-b from-buttonBgGradientFrom to-buttonBgGradientTo p-8 rounded-[25px] text-[1.5rem] text-white`}
    >
      {pending ? 'Is loading...' : text}
    </button>
  );
};

export default FormSubmitButton;
