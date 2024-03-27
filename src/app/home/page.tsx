import CreditCard from '@/components/home/CreditCard';
import Wallet from '@/components/wallet/wallet';
import NavBar from '@/components/navbar/navbar';
import { auth } from '@/lib/auth';
import Header from '@/components/header/Header';

const Home = async () => {
  const { user } = await auth();
  const hasValidCreditCard = !!(user as any).credit_card;
  const creditCardNumber = (user as any).credit_card;
  const userId = (user as any).id;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <CreditCard
          hasValidCreditCard={hasValidCreditCard ? true : false}
          creditCardNumber={creditCardNumber}
          userId={userId}
        />
        <Wallet
          trendingUpTitle="Income"
          trendingDownTitle="Expense"
          userId={userId}
          category="finance"
        />
      </main>
      {hasValidCreditCard && <NavBar />}
    </>
  );
};

export default Home;
