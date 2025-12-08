"use client";
import { Search, Settings, User } from "lucide-react";
import Logo from "../Logo";
import { useEffect, useState } from "react";

export default function DashboardNav() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div className=" flex justify-between w-full h-fit   rounded-[inherit]">
      <div className="w-fit">
        <Logo size={isDesktop ? 24 : 22} />
      </div>
      <div className="h-fit  gap-2 rounded-xl items-center px-3 py-2  bg-neutral-900 hidden lg:flex">
        <Search size={18} className="text-neutral-600" />
        <input
          className="h-fit focus:outline-0  text-sm"
          placeholder="Search..."
        />
      </div>
      <div className="flex gap-2 h-fit">
        <div className="hidden lg:flex flex-col mx-1">
          <div className="text-md font-medium tracking-tight text-neutral-200">
            Divyansh Swarnkar
          </div>
          <div className="text-[12px] font-light tracking-tight text-neutral-400 leading-2.5">
            {" "}
            divyanshsoni919@gmail.com
          </div>
        </div>
        <div className="rounded-full hover:rotate-90 transition-all duration-200 hover:text-neutral-300 cursor-pointer h-fit bg-neutral-800 text-neutral-400 p-2">
          <Settings size={18} />
        </div>
        <div className="rounded-full h-fit  bg-neutral-800 text-neutral-400 p-2 cursor-pointer transition-all duration-200 hover:text-neutral-300">
          <User size={18} />
        </div>
      </div>
    </div>
  );
}
