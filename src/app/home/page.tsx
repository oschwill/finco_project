import CreditCard from '@/components/home/creditCard';
import Wallet from '@/components/wallet/wallet';
import NavBar from '@/components/navbar/navbar';
import { auth } from '@/lib/auth';

const Home = async () => {
  const { user } = await auth();
  const hasValidCreditCard = !!(user as any).credit_card;
  const creditCardNumber = (user as any).credit_card;

  return (
    <>
      <main className="flex flex-col items-center">
        <CreditCard
          hasValidCreditCard={hasValidCreditCard ? true : false}
          creditCardNumber={creditCardNumber}
        />
        <Wallet />
      </main>
      <NavBar />
    </>
  );
};

export default Home;
