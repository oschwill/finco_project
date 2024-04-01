import { ReactNode } from 'react';

interface HeadLineProp {
  icon: ReactNode;
  headLine: string;
}

const HeadLineSettings: React.FC<HeadLineProp> = ({ icon, headLine }) => {
  return (
    <div className="flex justify-between text-textColor items-center">
      <div className="flex gap-6">
        {icon}
        <p>{headLine}</p>
      </div>
    </div>
  );
};

export default HeadLineSettings;
