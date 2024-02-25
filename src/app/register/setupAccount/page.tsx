import ProfileCompleted from '@/components/register/ProfileCompleted';

const SetupAcc = () => {
  return (
    <main className="flex flex-col items-center">
      <section className="w-[90%] flex flex-col gap-[45px]">
        <article className="flex flex-col">
          <h1 className="text-[3rem] font-bold text-center">Setup your account</h1>
        </article>
        <article>
          <ProfileCompleted />
        </article>
      </section>
    </main>
  );
};

export default SetupAcc;
