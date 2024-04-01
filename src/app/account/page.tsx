import DynamicAccordion from '@/components/general/DynamicAccordion';
import Header from '@/components/header/Header';
import Bell from '@/components/icons/Bell';
import Feather from '@/components/icons/Feather';
import Help from '@/components/icons/Help';
import Settings from '@/components/icons/Settings';
import NavBar from '@/components/navbar/navbar';
import ChangePassword from '@/components/settings/ChangePassword';
import Faq from '@/components/settings/Faq';
import HeadLineSettings from '@/components/settings/HeadLineSettings';
import Notifications from '@/components/settings/Notifications';
import BalanceIcons from '@/components/trendingIcons/BalanceIcons';
import Wallet from '@/components/wallet/wallet';
import { auth } from '@/lib/auth';

const Account = async () => {
  const { user } = await auth();
  const userId = (user as any).id;
  const accountType = (user as any).account_type;

  const componentsToRender = [
    {
      headLine: <HeadLineSettings icon={<Settings />} headLine="Settings" />,
      component: accountType === 'finco' ? <ChangePassword /> : null,
    },
    {
      headLine: <HeadLineSettings icon={<Help />} headLine="FAQ" />,
      component: <Faq />,
    },
  ];

  return (
    <>
      <Header />
      <main className="p-5 flex flex-col items-center gap-5 mb-[125px]">
        <section className="flex flex-col gap-12 w-[90%]">
          <article>
            <DynamicAccordion
              headLine={<HeadLineSettings icon={<Feather />} headLine="My wallet" />}
            >
              <BalanceIcons
                trendingUpTitle="Beginning"
                trendingDownTitle="Current"
                userId={userId}
                category="capital"
              />
            </DynamicAccordion>
          </article>
          <article>
            <Notifications />
          </article>
          <article>
            <DynamicAccordion components={componentsToRender} />
          </article>
        </section>
      </main>
      <NavBar />
    </>
  );
};

export default Account;
