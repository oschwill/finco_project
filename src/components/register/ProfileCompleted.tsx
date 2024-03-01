'use client';

// import { completeRegister } from '@/lib/action';
import { completeRegister } from '@/lib/clientAction';

// import { getCookieData } from '@/lib/clientAction';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useRef, useState } from 'react';
import Loading from '../icons/Loading';

const ProfileCompleted: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [error, setErrorMessage] = useState(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const route = useRouter();

  const handleUploadClick = () => {
    document.getElementById('picture').click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Wir holen uns die File
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCompleteRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const { isValid, message } = await completeRegister(e, route);

    if (!isValid) {
      setErrorMessage(message);
    }

    setIsLoading(false);
  };

  return (
    <form className="mb-8 flex flex-col gap-28" onSubmit={handleCompleteRegister}>
      <div className="flex flex-col">
        <label htmlFor="picture" className="text-[1.5rem] pb-8">
          Profile picture
        </label>
        <div className="bg-inputBackColor relative h-[300px] rounded-3xl">
          {imagePreview ? (
            <div className="absolute inset-0 z-0">
              <Image src={imagePreview} alt="Profile Image" layout="fill" objectFit="cover" />
              <p
                className="absolute text-white text-[1.5rem] p-2  rounded-3xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-slate-400"
                onClick={handleClearImage}
              >
                Clear Image
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 z-0">&nbsp;</div>
          )}
          <div
            className="bg-gradient-to-b from-uploadButtonGradientFrom to-uploadButtonGradientTo flex justify-center items-center p-[4.5%] rounded-full absolute bottom-[-30px] left-12 z-10"
            onClick={handleUploadClick}
          >
            <Image
              src="/images/camera_plus.png"
              className="z-10"
              height={35}
              width={35}
              alt="File Button"
            />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            name="picture"
            id="picture"
            className="absolute bottom-0 hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cardNumber"></label>
        <input
          type="text"
          name="cardNumber"
          id="cardNumber"
          className={`${
            error && 'border-2 border-red-600'
          } w-full p-8 rounded-[25px] text-[1.5rem] bg-inputBackColor`}
          placeholder="CardNumber"
        />
      </div>
      <div className="relative">
        {error && (
          <span className="absolute p-4 text-center bg-pink-300 text-red-900 w-full text-[1.5rem] font-bold">
            {error}
          </span>
        )}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <button className="mt-16 bg-gradient-to-b from-buttonBgGradientFrom to-buttonBgGradientTo p-8 rounded-[25px] text-[1.5rem] text-white">
          Profile Complete
        </button>
      )}
    </form>
  );
};

export default ProfileCompleted;
