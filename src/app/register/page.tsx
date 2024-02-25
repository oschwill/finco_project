import RegisterForm from '@/components/register/RegisterForm';
import Link from 'next/link';
import { Suspense } from 'react';

const SignUp = () => {
  return (
    <main className="flex flex-col items-center">
      <section className="w-[90%] flex flex-col gap-[75px]">
        <article className="flex flex-col gap-6">
          <h1 className="text-[3rem] font-bold text-center">Create an account</h1>
          <p className="text-[1.5rem] text-center">
            Lorem ipsum dolor sit amet, consectetur adip sicing elit, sed do eiusmod.
          </p>
        </article>
        <Suspense fallback="is Loading...">
          <article>
            <RegisterForm />
          </article>
        </Suspense>
        <article className="fixed bottom-20 text-[1.5rem] inset-x-0 max-w-max mx-auto">
          <p>
            All ready have any account?{' '}
            <Link href="/login" className="text-linkColor font-bold">
              {' '}
              Login
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
};

export default SignUp;
