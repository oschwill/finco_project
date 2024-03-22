import BalanceIcons from '@/components/balanceIcons/balanceIcons';
import Header from '@/components/header/Header';
import NavBar from '@/components/navbar/navbar';

const Reports = () => {
  return (
    <>
      <Header />
      <main className="reports mx-6">
        <h1 className="text-[28px] font-bold mb-1">Report</h1>
        <BalanceIcons
          trendingUpTitle={'Beginning'}
          trendingUpValue={5000}
          trendingDownTitle={'Current'}
          trendingDownValue={1000}
        />
        <div>CHART</div>
        <h2>Total Transactions</h2>
      </main>
      <NavBar />
    </>
  );
};

export default Reports;
