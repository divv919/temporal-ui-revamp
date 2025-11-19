import Image from "next/image";
import Navbar from "./components/Navbar";
import Gradient from "./components/Gradient";
import { headerSubtitle, headerTitle, snippets } from "./lib/constants";
import Button from "./components/ui/button";
import {
  Bookmark,
  ChartColumn,
  ChartPie,
  ChevronRight,
  Copy,
  House,
  Search,
  Settings,
  User,
} from "lucide-react";
import Logo from "./components/Logo";
import { cn } from "./lib/util";
import CodeBlock from "./components/CodeBlock";

export default function Home() {
  return (
    <div className=" min-h-[3000px] overflow-hidden items-center justify-center bg-zinc-50 font-sans dark:bg-neutral-950 relative ">
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
            <Button className="w-fit mx-auto">
              <div className="flex gap-1 items-center ">
                Join For Free{" "}
                <div className="-mr-1">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Button>
          </div>
        </div>{" "}
        <div className=" w-full h-140 absolute bottom-0 ">
          <div className="p-3 bg-linear-90 from-neutral-950/5 via-neutral-50/15  to-neutral-950/5  backdrop-blur-3xl  shadow-[inset_0px_0px_5px_rgba(255,255,255,0.2)] relative  mx-auto h-150 rounded-[36px] w-250 overflow-hidden">
            {/* Gradient */}
            <div className="h-50 w-[60%] border-linear pointer-events-none  bg-neutral-50/10 rounded-full blur-3xl -translate-y-1/2 absolute top-0 left-1/2 -translate-x-1/2"></div>
            <div className="px-8 py-6 flex flex-col gap-8 h-full w-full rounded-[inherit] shadow-[0px_0px_3px_rgba(255,255,255,0.2)] bg-neutral-950">
              <div className=" flex justify-between w-full h-fit   rounded-[inherit]">
                <div className="w-fit">
                  <Logo />
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
              <div className="h-full flex gap-3">
                <div className="tracking-tight text-sm text-neutral-500 h-full w-[20%] flex flex-col gap-4 rounded-xl border border-neutral-800 bg-neutral-900 px-0 py-3">
                  <div
                    className={cn(
                      "flex gap-2 items-center ",
                      "bg-linear-0 gap-1 from-green-500 mx-2 to-green-800 px-2 py-1 rounded-md text-green-100"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full p-1 bg-neutral-800",
                        "bg-transparent "
                      )}
                    >
                      <House size={16} />
                    </div>{" "}
                    Starter Code
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <div className="rounded-full p-1 bg-neutral-800 ">
                      <Bookmark size={16} />
                    </div>
                    Discover
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <div className="rounded-full p-1 bg-neutral-800">
                      {" "}
                      <ChartPie size={16} />
                    </div>
                    Use Cases
                  </div>
                  <div className="flex gap-2 items-center px-4">
                    <div className="rounded-full p-1 bg-neutral-800">
                      {" "}
                      <ChartColumn size={16} />
                    </div>
                    Enterprise
                  </div>
                </div>
                <div className="h-full flex flex-col  w-full rounded-xl bg-neutral-900  border border-neutral-800 px-3 ">
                  <div className="border-b border-neutral-800 flex justify-between items-center">
                    <div className=" flex items-center gap-4 text-sm tracking-tight font-light text-neutral-500 py-2">
                      <div className="px-2 py-1 bg-neutral-800 rounded-md">
                        Python
                      </div>
                      <div>Go</div>
                      <div>Typescript</div>
                      <div>Ruby</div>
                      <div>Java</div>
                      <div>PHP</div>
                    </div>
                    <div className="text-sm tracking-tight font-light text-neutral-500  px-2">
                      <Copy size={16} />
                    </div>
                  </div>
                  <div className="h-full w-full  my-2 rounded-xl">
                    <CodeBlock
                      language={snippets[0].language}
                      code={snippets[0].code}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
