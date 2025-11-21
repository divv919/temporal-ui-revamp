"use client";

import { sliderData } from "@/app/lib/constants";
import { cn } from "@/app/lib/util";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 6000);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);
  return (
    <div className="mt-90 w-full h-120  px-40  relative flex gap-16">
      <div className="w-1/2 flex flex-col  gap-10">
        {sliderData.map((slide, index) => {
          return (
            <div
              className={cn(
                "flex flex-col  gap-2",
                currentSlide === index ? "h-[50%]" : "h-[25%]"
              )}
            >
              <div className="flex flex-col gap-0">
                <div className="text-lg text-green-600 font-medium tracking-tight">
                  {slide.pretitle}
                </div>
                <div className="text-4xl text-green-50 font-light tracking-tight">
                  {slide.title}
                </div>
              </div>
              {currentSlide === index && (
                <div className="tracking-tight  text-neutral-400">
                  {" "}
                  {slide.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-full w-1/2 bg-linear-45 from-neutral-800/20 to-neutral-600/20 backdrop-blur-3xl shadow-[inset_0px_0px_20px_rgba(255,255,255,0.1)] rounded-xl p-8">
        <Image
          src={sliderData[currentSlide].image}
          alt="slider-image"
          width={200}
          height={200}
          className="w-full h-full aspect-square "
        />
      </div>
    </div>
  );
}
