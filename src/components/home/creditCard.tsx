import { maskCreditCardNumber } from '@/lib/functionHelper';
import Image from 'next/image';

interface CardProps {
  hasValidCreditCard: boolean;
  creditCardNumber?: string;
}

const CreditCard: React.FC<CardProps> = ({ hasValidCreditCard, creditCardNumber }) => {
  const { hiddenNumbers, visibleNumbers } = maskCreditCardNumber(creditCardNumber);

  return (
    <>
      <section className="w-[90%] flex flex-col gap-[75px]">
        <div className='w-full h-[200px] my-0 mx-auto bg-[url("/img/home/card_background.svg")] bg-cover bg-center bg-no-repeat rounded-3xl relative'>
          <div className="relative">
            {hasValidCreditCard ? (
              <Image
                className="absolute top-[-22.5px] right-[-15px]"
                src="/img/home/card-active.svg"
                alt="card active icon"
                width={75}
                height={75}
              />
            ) : (
              <Image
                className="absolute top-[-22.5px] right-[-15px]"
                src="/img/home/card-inactive.svg"
                alt="card inactive icon"
                width={75}
                height={75}
              />
            )}
          </div>
          <div className="absolute left-[17.5px] bottom-[55px] text-[1.25rem]">
            <p className="text-white opacity-75">Credit Card</p>
            <div className="text-white flex items-center justify-center">
              <p className="text-[2rem] lin">{hiddenNumbers}</p>
              <p className="mb-2">&nbsp;{visibleNumbers}</p>
            </div>
          </div>
          <div className="absolute bottom-[25px] right-0">
            <p className="pr-5 pt-10  text-white text-[1.25rem]">09/25</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CreditCard;
