import NavBar from '@/components/navbar/navbar';
import GlobalTransaction from '@/components/transaction/GlobalTransaction';
import { auth } from '@/lib/auth';

const AllTransactions = async () => {
  const { user } = await auth();
  const userId = (user as any).id;

  return (
    <main className="flex flex-col items-center gap-6">
      <GlobalTransaction userId={userId} />
      <NavBar />
    </main>
  );
};

export default AllTransactions;
