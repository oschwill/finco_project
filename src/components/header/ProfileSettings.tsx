'use client';

import { handleLogout } from '@/lib/action';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProfileSettings: React.FC<{ profileImage: string; userName: string; email: string }> = ({
  profileImage,
  userName,
  email,
}) => {
  const [showProfileBox, setShowProfileBox] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    if (isLogout) {
      handleLogout();
    }
  }, [isLogout]);

  return (
    <article className="flex justify-end relative">
      <Image
        src={`${profileImage ? profileImage : '/images/test_pic.jpg'}`}
        width={50}
        height={50}
        alt="Logo"
        className="rounded-full"
        onClick={() => setShowProfileBox((cur) => !cur)}
      />

      {showProfileBox && (
        <div className="flex flex-col p-4 absolute z-20 right-[-20px] top-[50px] gap-4 bg-gray-50 h-[150px] w-[150px] text-[1.5rem] rounded-e-3xl">
          <div className="text-center border-b-2 border-gray-600 h-[60px]">
            <p className="font-bold">{userName}</p>
            <p className="text-[1.25rem]">{email}</p>
          </div>
          <div className="text-center flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex gap-2 items-center w-[100px]">
              <FontAwesomeIcon icon={faGear} />
              <Link href="/account">Settings</Link>
            </div>
            <div className="flex gap-2 items-center w-[100px]">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p onClick={() => setIsLogout(true)}>Logout</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default ProfileSettings;
