const BalanceIcons = (props: {
  trendingUpTitle: string;
  trendingUpValue: number;
  trendingDownTitle: string;
  trendingDownValue: number;
}) => {
  return (
    <section className='balance-icons my-5'>
      <div className='wrapper grid grid-cols-2 gap-3'>
        <div className='flex gap-3 bg-[#f7f7f7] p-3 rounded-[36px]'>
          <div className='flex'>
            <img src='/img/trending-up.svg' alt='trending up icon' />
          </div>
          <div className='flex flex-col'>
            <p className="'text-sm font-light">{props.trendingUpTitle}</p>
            <p className='font-bold'>$ {props.trendingUpValue}</p>
          </div>
        </div>

        <div className='flex gap-3 bg-[#f7f7f7] p-3 rounded-[36px]'>
          <div className='flex'>
            <img src='/img/trending-down.svg' alt='trending up icon' />
          </div>
          <div className='flex flex-col'>
            <p className="'text-sm font-light">{props.trendingDownTitle}</p>
            <p className='font-bold'>$ {props.trendingDownValue}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BalanceIcons;
