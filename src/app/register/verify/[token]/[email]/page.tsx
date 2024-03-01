import VerifyUserForm from '@/components/register/VerifyUserForm';
import { checkSlug } from '@/lib/action';
import { redirect } from 'next/navigation';

const VerifyUser = async ({ params }) => {
  let { token, email } = params;
  email = decodeURIComponent(email);

  // Überprüfen ob das token mit der email Adresse existiert, sonst weiterleiten
  const hasData = await checkSlug(token, email);

  if (!hasData) {
    // redirect('/login');
  }

  return (
    <main>
      <section className="flex flex-col items-center justify-center">
        <article className="w-[95%] text-[1.5rem]">
          <h2 className="text-[2.5rem]">Please verify your registration</h2>
          <VerifyUserForm token={token} email={email} />
        </article>
      </section>
    </main>
  );
};

export default VerifyUser;
