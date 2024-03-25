import Header from '@/components/header/Header';
import NavBar from '@/components/navbar/navbar';
import TransactionStatistic from '@/components/transaction/TransactionStatistic';
import BalanceIcons from '@/components/trendingIcons/BalanceIcons';
import { auth } from '@/lib/auth';

const Reports = async () => {
  const { user } = await auth();
  const userId = (user as any).id;

  return (
    <>
      <Header />
      <main className="flex flex-col items-center gap-6">
        <section className="w-[90%] flex flex-col gap-4">
          <h1 className="text-[28px] font-bold mb-1">Report</h1>

          <BalanceIcons
            trendingUpTitle="Beginning"
            trendingDownTitle="Current"
            userId={userId}
            category="capital"
          />
        </section>
        <section className="w-[90%] flex flex-col gap-4">
          <div>CHART</div>
        </section>
        <section className="w-[90%] flex flex-col gap-4">
          <h2 className="text-[2rem] font-bold">Transactions Statistic</h2>
          <TransactionStatistic userId={userId} />
        </section>
      </main>
      <NavBar />
    </>
  );
};

export default Reports;
