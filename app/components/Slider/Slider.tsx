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
    <div className="mt-60 lg:mt-90 w-full h-120  px-6 lg:px-40  relative flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 ">
      <div className="w-full h-1/2 lg:h-full lg:w-1/2 flex flex-col gap-4 lg:gap-10">
        {sliderData.map((slide, index) => {
          return (
            <motion.div
              key={index}
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
                    className="absolute w-[1px] bg-green-200 inset-0 lg:-left-2"
                  ></motion.div>
                )}
              </AnimatePresence>
              <motion.div layout className="flex flex-col gap-2  lg:gap-0">
                <div className="text-xs leading-3 lg:leading-7 lg:text-lg text-green-600 font-medium tracking-tight">
                  {slide.pretitle}
                </div>
                <div className="text-lg leading-5 lg:leading-11 lg:text-4xl text-green-50 font-normal lg:font-light tracking-tight">
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
                  className="text-[13px] leading-4 lg:leading-6 lg:text-[17px]  tracking-normal text-neutral-300/85 font-light"
                >
                  {slide.description}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <motion.div className="h-60 lg:h-full w-full lg:w-1/2 flex items-center justify-center bg-linear-45 from-neutral-800/20 to-neutral-600/20 backdrop-blur-3xl shadow-[inset_0px_0px_20px_rgba(255,255,255,0.1)] rounded-xl lg:p-8">
        <AnimatePresence mode="wait">
          <MotionImage
            key={currentSlide + "image-key"}
            initial={{ filter: "blur(4px)", opacity: 0 }}
            exit={{ filter: "blur(2px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.1 }}
            src={sliderData[currentSlide].image}
            alt="slider-image"
            width={800}
            height={800}
            priority // ✅ FORCE eager loading
            loading="eager" // ✅ disables viewport-based lazy loading
            className="w-full h-full aspect-square p-3 object-contain"
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
