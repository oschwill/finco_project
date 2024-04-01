'use client';

import Bell from '../icons/Bell';

const Notifications = () => {
  return (
    <div className="flex justify-between text-textColor items-center rounded-xl pl-[15px] pr-[15px] pt-[25px] pb-[25px] bg-inputBackColor">
      <div className="flex gap-6 ">
        <Bell />
        <p className="text-[1.5rem]">Notification</p>
      </div>
      <input type="checkbox" className="toggle  toggle-success" />
    </div>
  );
};

export default Notifications;
