import { Search, Settings, User } from "lucide-react";
import Logo from "../Logo";

export default function DashboardNav() {
  return (
    <div className=" flex justify-between w-full h-fit   rounded-[inherit]">
      <div className="w-fit">
        <Logo size={24} />
      </div>
      <div className="h-fit flex gap-2 rounded-xl items-center px-3 py-2  bg-neutral-900 ">
        <Search size={18} className="text-neutral-600" />
        <input
          className="h-fit focus:outline-0  text-sm"
          placeholder="Search..."
        />
      </div>
      <div className="flex gap-2 h-fit">
        <div className="flex flex-col mx-1">
          <div className="text-md font-medium tracking-tight text-neutral-200">
            Divyansh Swarnkar
          </div>
          <div className="text-[12px] font-light tracking-tight text-neutral-400 leading-2.5">
            {" "}
            divyanshsoni919@gmail.com
          </div>
        </div>
        <div className="rounded-full  h-fit bg-neutral-800 text-neutral-400 p-2">
          <Settings size={18} />
        </div>
        <div className="rounded-full h-fit  bg-neutral-800 text-neutral-400 p-2">
          <User size={18} />
        </div>
      </div>
    </div>
  );
}
