import Header from '@/components/header/header';
import CreditCard from '@/components/creditCard/creditCard';
import Wallet from '@/components/wallet/wallet';
import NavBar from '@/components/navbar/navbar';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <CreditCard />
        <Wallet />
      </main>
      <NavBar />
    </>
  );
};

export default Home;
