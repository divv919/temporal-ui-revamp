import { navbarConstants } from "../lib/constants";
import { ButtonVariants } from "../types/component";
import Logo from "./Logo";
import Button from "./ui/button";

export default function Navbar() {
  return (
    <div className="fixed top-0 w-[90%] rounded-2xl my-2 border-neutral-800/30 border  z-100 bg-neutral-800/60 backdrop-blur-3xl  h-fit px-6 py-4  flex justify-between items-center ">
      {/* <div className="bg-linear-90  from-green-600 to-green-800 "> */}
      <Logo size={24} />
      {/* </div> */}
      <div className="flex gap-6 items-center">
        <div className="flex gap-5">
          {navbarConstants.links.map((link, index) => {
            return <div key={index + link.name}>{link.name}</div>;
          })}
        </div>
        <div className="flex gap-4">
          {navbarConstants.buttons.map((button, index) => {
            return (
              <Button
                key={index + button.name}
                variant={button.type as unknown as ButtonVariants}
              >
                {button.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
