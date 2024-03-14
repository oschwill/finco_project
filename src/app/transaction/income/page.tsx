import CreditCard from '@/components/home/creditCard';
import TransactionForm from '@/components/transaction/TransactionForm';
import { auth } from '@/lib/auth';

const Income = async () => {
  const { user } = await auth();
  const hasValidCreditCard = !!(user as any).credit_card;
  const creditCardNumber = (user as any).credit_card;
  const userId = (user as any).id;

  return (
    <main className="flex flex-col items-center gap-6">
      <section className="w-[90%] flex">
        <article className="place-self-start">
          <h2 className="text-[2.5rem] text-headLineColorPrimary font-bold">Add income</h2>
        </article>
      </section>
      <CreditCard
        hasValidCreditCard={hasValidCreditCard ? true : false}
        creditCardNumber={creditCardNumber}
      />

      <TransactionForm transactionType="income" text="Add income" userId={userId} />
    </main>
  );
};

export default Income;
