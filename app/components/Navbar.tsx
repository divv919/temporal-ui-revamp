"use client";
import {
  AnimatePresence,
  easeInOut,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ChevronRight } from "lucide-react";
import { navbarConstants } from "../lib/constants";
import { ButtonVariants } from "../types/component";
import Logo from "./Logo";
import Button from "./ui/button";
import { cn } from "../lib/util";
import { useState } from "react";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [isNavbarShrinked, setIsNavbarShrinked] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (val) => {
    if (scrollYProgress.get() > 0) {
      setIsNavbarShrinked(true);
    } else {
      setIsNavbarShrinked(false);
    }
  });
  return (
    <motion.div
      animate={{
        width: isNavbarShrinked ? "80%" : "100%",
        boxShadow: isNavbarShrinked
          ? "inset 0px 0px 24px rgba(255,255,255,0.1)"
          : "none",
        backgroundColor: isNavbarShrinked
          ? "var(--color-neutral-800)/80"
          : "transparent",
      }}
      transition={{
        duration: 0.1,
        // ease: easeInOut,
      }}
      className={cn(
        "fixed overflow-hidden top-0  rounded-2xl my-2 z-100   h-fit px-6 py-5  flex justify-between items-center transition-all duration-150",
        "  backdrop-blur-3xl  "
      )}
    >
      <AnimatePresence>
        {isNavbarShrinked && (
          <>
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
          </>
        )}
      </AnimatePresence>

      <Logo size={24} />
      {/* </div> */}
      <motion.div
        animate={{ gap: isNavbarShrinked ? "200px" : "48px" }}
        className={cn(
          "flex w-full  justify-end items-center"
          // isNavbarShrinked ? "gap-50" : "gap-12"
        )}
      >
        <div className="flex gap-6">
          {navbarConstants.links.map((link, index) => {
            return <TextRoll key={index} text={link.name}></TextRoll>;
          })}
        </div>
        <div className="flex gap-4">
          {navbarConstants.buttons.map((button, index) => {
            return (
              <Button
                key={index + button.name}
                variant={button.type as unknown as ButtonVariants}
                className={cn(
                  "flex gap-1 items-center ",
                  button.name === "Get Started" && "pr-2"
                )}
              >
                {button.name}
                {button.name === "Get Started" && <ChevronRight size={20} />}
              </Button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
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
