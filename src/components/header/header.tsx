import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import ProfileSettings from './ProfileSettings';

const Header: React.FC = async () => {
  const { user } = await auth();
  const profileImage = (user as any).image_profile_path;
  const userName = (user as any).name;
  const email = (user as any).email;

  return (
    <header className="flex flex-col items-center mb-12 mt-16">
      <section className=" w-[90%] flex justify-between items-start">
        <article>
          <Link href="/home">
            <Image src="/img/Logo.svg" width={50} height={50} alt="Logo" />
          </Link>
        </article>
        <article>
          <p className="text-[1.1rem]">
            Logged in as <span className="font-bold">{userName}</span>
          </p>
        </article>
        <ProfileSettings profileImage={profileImage} userName={userName} email={email} />
      </section>
    </header>
  );
};

export default Header;
