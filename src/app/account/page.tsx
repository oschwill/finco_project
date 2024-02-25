import Arrow from "@/components/icons/Arrow";
import Bell from "@/components/icons/Bell";
import Darkmode from "@/components/icons/Darkmode";
import Feather from "@/components/icons/Feather";
import Help from "@/components/icons/Help";
import Logout from "@/components/icons/Logout";
import Settings from "@/components/icons/Settings";
import Image from "next/image";

const Account = () => {
 
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex justify-between text-textColor items-center rounded-xl p-5 bg-settingsBG">
        <div className="flex gap-3 ">
          <Feather />
          <p>My wallet</p>
        </div>
        <Arrow />
      </div>

      <div>
        <div className="flex justify-between text-textColor items-center rounded-xl p-5 bg-settingsBG">
          <div className="flex gap-3 ">
            <Bell />
            <p>Notification</p>
          </div>
          <input type="checkbox" className="toggle  toggle-success" />
        </div>

        {/*  */}

        <div className="flex justify-between items-center rounded-xl p-5 bg-settingsBG">
          <div className="flex gap-3 text-textColor">
            <Darkmode />
            <p>Darkmode</p>
          </div>
          <input type="checkbox" className="toggle  toggle-success" />
        </div>

        {/*  */}

        <div className="flex justify-between text-textColor items-center rounded-xl p-5 bg-settingsBG">
          <div className="flex gap-3 ">
            <Settings />
            <p>Settings</p>
          </div>
          <Arrow />
        </div>

        {/*  */}

        <div className="flex justify-between text-textColor items-center rounded-xl p-5 bg-settingsBG">
          <div className="flex gap-3 ">
            <Help />
            <p>FAQ</p>
          </div>
          <Arrow />
        </div>
      </div>

      <div className="flex justify-between text-textColor items-center rounded-xl p-5 bg-settingsBG">
        <div className="flex gap-3  ">
          <Logout />
          <p>Logout</p>
        </div>
        <Arrow />
      </div>
    </div>
  );
};

export default Account;
