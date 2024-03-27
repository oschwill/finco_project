import Header from '@/components/header/Header';
import CreditCard from '@/components/home/CreditCard';
import NavBar from '@/components/navbar/navbar';
import TransactionForm from '@/components/transaction/TransactionForm';
import { auth } from '@/lib/auth';

const Expense = async () => {
  const { user } = await auth();
  const hasValidCreditCard = !!(user as any).credit_card;
  const creditCardNumber = (user as any).credit_card;
  const userId = (user as any).id;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-6">
        <section className="w-[90%] flex">
          <article className="place-self-start">
            <h2 className="text-[2.5rem] text-headLineColorSecondary font-bold">Add expenses</h2>
          </article>
        </section>
        <CreditCard
          hasValidCreditCard={hasValidCreditCard ? true : false}
          creditCardNumber={creditCardNumber}
        />

        <TransactionForm transactionType="expense" text="Add expenses" userId={userId} />
        <NavBar />
      </main>
    </>
  );
};

export default Expense;
