import Navbar from "./components/Navbar";
import Gradient from "./components/Gradient";
import { headerSubtitle, headerTitle, snippets } from "./lib/constants";
import Button from "./components/ui/button";
import { ChevronRight } from "lucide-react";

import Dashboard from "./components/Dashboard/Dashboard";
import Slider from "./components/Slider/Slider";
import ActionSection from "./components/ActionSection";
import Footer from "./components/Footer";
import Marquee from "./components/Marquee";

export default function Home() {
  return (
    <div className="font-switzer min-h-fit overflow-hidden items-center justify-center bg-zinc-50  dark:bg-neutral-950 relative selection:bg-green-500 selection:text-neutral-50">
      <div className="mask-t-from-0% mask-t-to-10% fixed pointer-events-none w-full h-full bg-black/70   z-10 "></div>

      <div className="h-17 w-full flex items-center justify-center ">
        <Navbar />
      </div>

      <div className="w-[70%] h-[30%] blur-3xl  -translate-x-1/2 rounded-full opacity-2 bg-neutral-100 top-0 left-1/2 absolute -translate-y-1/2"></div>
      <div className="relative w-full   h-250">
        <Gradient />
        <div className="w-[50%] py-20 flex flex-col gap-5 mx-auto ">
          <div className="text-[80px] leading-19 text-center tracking-tight font-medium text-neutral-200">
            {headerTitle}
          </div>
          <div className="tracking-tight  text-center z-10 text-lg leading-5 text-neutral-500">
            {headerSubtitle}
          </div>
          <div className="mx-auto shadow-[0px_10px_20px] rounded-md shadow-green-400/12 w-fit">
            <Button className="w-fit mx-auto px-6 py-3 text-lg">
              <div className="flex gap-1 items-center ">
                Join For Free{" "}
                <div className="-mr-1">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Button>
          </div>
        </div>
        <div className=" w-full h-140  absolute bottom-0 ">
          <Dashboard />
        </div>
      </div>

      <Slider />
      <Marquee />
      <ActionSection />
      <Footer />
    </div>
  );
}
