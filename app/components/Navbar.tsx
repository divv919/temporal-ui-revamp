"use client";
import {
  AnimatePresence,
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { navbarConstants } from "../lib/constants";
import { ButtonVariants } from "../types/component";
import Logo from "./Logo";
import Button from "./ui/button";
import { cn } from "../lib/util";
import { SetStateAction, useEffect, useState } from "react";
import { MenuIcon, X } from "lucide-react";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [isNavbarShrinked, setIsNavbarShrinked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    if (scrollYProgress.get() > 0) {
      setIsNavbarShrinked(true);
    } else {
      setIsNavbarShrinked(false);
    }
  });

  useEffect(() => {
    console.log("isMenuOpen", isMenuOpen);
  }, [isMenuOpen]);
  return (
    <motion.div
      animate={{
        width:
          typeof window !== undefined && window.innerWidth < 768
            ? "100%"
            : isNavbarShrinked
            ? "80%"
            : "97%",
        boxShadow: isNavbarShrinked
          ? "inset 0px 0px 24px rgba(255,255,255,0.1)"
          : "none",
        backgroundColor: isNavbarShrinked
          ? "rgba(38, 38, 38, 0.8)"
          : "transparent",
      }}
      transition={{
        duration: 0.1,
      }}
      className={cn(
        "fixed  top-0 w-[100%] lg:w-[97%]  lg:rounded-2xl lg:my-2 z-1000   h-fit px-7 py-[20px] lg:px-6 lg:py-5  flex justify-between items-center transition-all duration-150",
        "  backdrop-blur-xl  "
      )}
    >
      <AnimatePresence>
        {isNavbarShrinked && (
          <div className="w-full h-full overflow-hidden lg:rounded-2xl absolute inset-0">
            <motion.div
              key={"bg-gradient-1"}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="absolute blur-2xl  h-8 w-28 bg-green-400/50"
            ></motion.div>
            <motion.div
              key={"bg-gradient-2"}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="absolute blur-2xl right-5 h-8 w-28 bg-green-400/80 -z-10"
            ></motion.div>
            <motion.div
              key={"bg-gradient-3"}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="absolute blur-2xl right-25 h-8 w-28 bg-green-50/50 -z-10"
            ></motion.div>
          </div>
        )}
      </AnimatePresence>

      <Logo
        size={typeof window !== undefined && window.innerWidth > 768 ? 24 : 22}
      />
      {/* </div> */}
      <motion.div
        animate={{ gap: isNavbarShrinked ? "200px" : "48px" }}
        className={cn(
          "flex w-full  justify-end items-center gap-[48px]"
          // isNavbarShrinked ? "gap-50" : "gap-12"
        )}
      >
        <div className="gap-6 hidden lg:flex">
          {navbarConstants.links.map((link, index) => {
            return <TextRoll key={index} text={link.name}></TextRoll>;
          })}
        </div>
        <div className=" gap-4 hidden lg:flex">
          {navbarConstants.buttons.map((button, index) => {
            return (
              <Button
                key={index + button.name}
                variant={button.type as unknown as ButtonVariants}
                className={cn(
                  "flex gap-1 items-center ",
                  button.name === "Get Started" && "pr-[17px]"
                )}
              >
                {button.name}
                {/* {button.name === "Get Started" && <ChevronRight size={20} />} */}
              </Button>
            );
          })}
        </div>
        {
          <motion.div
            initial={{ translateX: "-100%" }}
            animate={{
              translateX: isMenuOpen ? "0%" : "-100%",
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="absolute h-[100vh] inset-0 w-[100vw] lg:hidden"
          >
            <Menu setIsMenuOpen={setIsMenuOpen} />
          </motion.div>
        }
        <div onClick={() => setIsMenuOpen(true)} className=" lg:hidden">
          <MenuIcon size={22} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function Menu({
  setIsMenuOpen,
}: {
  setIsMenuOpen: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="absolute inset-0 w-[100vw] h-[100vh] bg-neutral-950 gap-16 flex flex-col px-7 py-[20px] ">
      <div className="flex justify-between">
        <Logo size={22} />
        <X onClick={() => setIsMenuOpen(false)} color="white" />
      </div>

      <div className="h-full w-full  flex flex-col gap-7 px-1">
        {navbarConstants.links.map((link, index) => {
          return (
            <div className="text-lg" key={index}>
              {link.name}
            </div>
          );
        })}
        <div className="flex justify-center gap-6 mt-5">
          {navbarConstants.buttons.map((button, index) => {
            return (
              <Button
                key={index + button.name}
                variant={button.type as unknown as ButtonVariants}
                className={cn(
                  "flex gap-1 items-center ",
                  button.name === "Get Started" && "pr-[17px]"
                )}
              >
                {button.name}
                {/* {button.name === "Get Started" && <ChevronRight size={20} />} */}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TextRoll({ text }: { text: string }) {
  return (
    <motion.div
      initial="still"
      animate="still"
      whileHover="hover"
      className="relative overflow-hidden w-fit h-fit cursor-pointer font-light tracking-wide"
    >
      <motion.span className="flex">
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hover: { y: "-80%", opacity: 0, filter: "blur(0px)" },
              still: { y: 0, opacity: 1, filter: "blur(0px)" },
            }}
            transition={{
              delay: 0.016 * index,
              type: "spring",
              damping: 22,
              stiffness: 250,
              mass: 1,
            }}
            style={{ willChange: "transform" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        variants={{
          hover: {},
          still: {},
        }}
        transition={{}}
        className="block absolute inset-0"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={{
              hover: { y: 0, opacity: 1, filter: "blur(0px)" },
              still: { y: "80%", opacity: 0, filter: "blur(0px)" },
            }}
            transition={{
              delay: 0.016 * index,
              type: "spring",
              damping: 22,
              stiffness: 250,
              mass: 1,
            }}
            style={{
              willChange: "transform",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  );
}
