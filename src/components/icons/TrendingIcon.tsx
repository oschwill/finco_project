import Image from 'next/image';
import { TrendingValues } from '@/lib/dataTypes';

const TrendingIcon: React.FC<TrendingValues> = ({ image, trendingUpTitle, value }) => {
  return (
    <div className="flex items-center gap-3 bg-[#f7f7f7] p-3 rounded-[36px]">
      <div className="flex">
        <Image src={image} alt="trending up icon" width={48} height={48} />
      </div>
      <div className="flex flex-col">
        <p className="font-light">{trendingUpTitle}</p>
        <p className="font-bold">+$ {value} </p>
      </div>
    </div>
  );
};

export default TrendingIcon;
