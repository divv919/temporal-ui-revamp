"use client";

import { sliderData } from "@/app/lib/constants";
import { cn } from "@/app/lib/util";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const MotionImage = motion(Image);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 6000);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);
  return (
    <div className="mt-90 w-full h-120  px-40  relative flex gap-16 ">
      <div className="w-1/2 flex flex-col   gap-10">
        {sliderData.map((slide, index) => {
          return (
            <motion.div
              layout
              style={{
                willChange: "transform",
              }}
              onClick={() => {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
                  }, 6000);
                }
                setCurrentSlide(index);
              }}
              className={cn(
                " flex flex-col  gap-2 px-3 after:content-[''] relative cursor-pointer  ",
                currentSlide === index ? "  h-fit" : "h-fit"
              )}
            >
              <AnimatePresence>
                {currentSlide === index && (
                  <motion.div
                    style={{
                      willChange: "transform",
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                      },
                    }}
                    initial={{ height: "0%" }}
                    animate={{ height: "100%", opacity: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute w-[1px] bg-green-200 inset-0 -left-2"
                  ></motion.div>
                )}
              </AnimatePresence>
              <motion.div layout className="flex flex-col gap-0">
                <div className="text-lg text-green-600 font-medium tracking-tight">
                  {slide.pretitle}
                </div>
                <div className="text-4xl text-green-50 font-light tracking-tight">
                  {slide.title}
                </div>
              </motion.div>
              {currentSlide === index && (
                <motion.div
                  layout
                  initial={{
                    filter: "blur(2px)",
                    opacity: 0,
                  }}
                  exit={{
                    filter: "blur(2px)",
                    opacity: 0,
                  }}
                  animate={{ filter: "blur(0px)", opacity: 1 }}
                  className="tracking-tight  text-neutral-400"
                >
                  {slide.description}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <motion.div className="h-full w-1/2 flex items-center justify-center bg-linear-45 from-neutral-800/20 to-neutral-600/20 backdrop-blur-3xl shadow-[inset_0px_0px_20px_rgba(255,255,255,0.1)] rounded-xl p-8">
        <AnimatePresence mode="wait">
          <MotionImage
            key={currentSlide + "image-key"}
            initial={{ filter: "blur(4px)", opacity: 0 }}
            exit={{ filter: "blur(2px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{
              duration: 0.1,
            }}
            src={sliderData[currentSlide].image}
            alt="slider-image"
            width={200}
            height={200}
            className="w-full h-full aspect-square pr-3"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
