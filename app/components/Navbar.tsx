import { ChevronRight } from "lucide-react";
import { navbarConstants } from "../lib/constants";
import { ButtonVariants } from "../types/component";
import Logo from "./Logo";
import Button from "./ui/button";

export default function Navbar() {
  return (
    <div className="fixed overflow-hidden shadow-[inset_0px_0px_24px_rgba(255,255,255,0.1)] top-0 w-[90%] rounded-2xl my-2 z-100 bg-neutral-800/60 backdrop-blur-3xl  h-fit px-6 py-5  flex justify-between items-center ">
      {/* <div className="bg-linear-90  from-green-600 to-green-800 "> */}
      <div className="absolute blur-2xl  h-8 w-28 bg-green-400/50">hi</div>
      <div className="absolute blur-2xl right-5 h-8 w-28 bg-green-400/80 -z-10"></div>
      <div className="absolute blur-2xl right-25 h-8 w-28 bg-green-50/50 -z-10"></div>

      <Logo size={24} />
      {/* </div> */}
      <div className="flex w-full gap-75 justify-end items-center">
        <div className="flex gap-6">
          {navbarConstants.links.map((link, index) => {
            return (
              <div
                className="  relative font-light cursor-pointer 
    after:content-[''] after:absolute after:left-0 after:-bottom-[2px] 
    after:h-[1.5px] after:rounded-2xl after:w-0 after:bg-neutral-50/70
    after:transition-all after:duration-300 
    hover:after:w-full"
                key={index + link.name}
              >
                {link.name}
              </div>
            );
          })}
        </div>
        <div className="flex gap-4">
          {navbarConstants.buttons.map((button, index) => {
            return (
              <Button
                key={index + button.name}
                variant={button.type as unknown as ButtonVariants}
                className="flex gap-1 items-center pr-2"
              >
                {button.name}
                {button.name === "Get Started" && <ChevronRight size={20} />}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
