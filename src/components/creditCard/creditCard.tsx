interface User {
  card_verified: boolean;
  card_last_digits: number;
  card_exp_date: string;
}

//! style ist noch nicht responsive. welches viewport nehmen wir? 390px (iPhone 12)?
//! card background ist falsches bild (textgröße ist falsch)
//! nehmen wir vielleicht sowieso ein paket für den credit card stuff? weil dann kann der platzhalter hier komplett weg
//! figma lässt mich die icons und bilder nicht richtig exportieren 😡
//! icons sollen jedensfalls nicht so bleiben. nehmen wir viellecht welche von daisyUI?

const CreditCard = () => {
  const user: User = {
    card_verified: false,
    card_last_digits: 1234,
    card_exp_date: '01/25',
  };

  return (
    <>
      <div className='h-44 my-5'>
        <div className='w-4/5 h-full my-0 mx-auto bg-[url("/img/home/card-bg-noshadow.svg")] bg-contain bg-center bg-no-repeat border'>
          <div className='relative'>
            {user.card_verified ? (
              <img
                className='absolute object-left-top ml-48 -right-4 -top-7'
                src='/img/home/card-active.svg'
                alt='card active icon'
              />
            ) : (
              <img
                className='absolute object-left-top ml-48 -right-4 -top-7'
                src='/img/home/card-inactive.svg'
                alt='card inactive icon'
              />
            )}
          </div>
          <div className='flex justify-between mt-24'>
            <p className='pl-16 text-sm'>{user.card_last_digits}</p>
            <p className='pr-5 pt-10 text-xs'>{user.card_exp_date}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCard;
