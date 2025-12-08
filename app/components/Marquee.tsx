"use client";

import * as simpleIcons from "simple-icons";
import { AnimationPlaybackControlsWithThen, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { animate } from "motion";
// Type for simple-icons
type SimpleIcon = {
  title: string;
  slug: string;
  hex: string;
  source: string;
  svg: string;
  path: string;
  guidelines?: string;
  license?: {
    type: string;
    url: string;
  };
};

// Brand names to display
const brandNames = [
  "godaddy",
  "snapchat",
  "kotak",
  "vodafone",
  "cloudflare",
  "gitlab",
  "bentley",
  "github",
  "microsoft",
  "google",
  "apple",
  "amazon",
  "meta",
  "netflix",
  "spotify",
];

// Fallback brands if some are not available

// Helper function to get icon data
function getIconData(brandName: string): SimpleIcon | null {
  // Try different capitalization formats
  const formats = [
    `si${brandName.charAt(0).toUpperCase() + brandName.slice(1)}`, // siCheckr
    `si${brandName.toUpperCase()}`, // siCHECKR
    `si${brandName}`, // sicheckr
  ];

  // Special cases for known brands
  const specialCases: Record<string, string> = {
    godaddy: "siGoDaddy",
  };

  if (specialCases[brandName.toLowerCase()]) {
    const icon = simpleIcons[
      specialCases[brandName.toLowerCase()] as keyof typeof simpleIcons
    ] as SimpleIcon | undefined;
    if (icon && typeof icon === "object" && "hex" in icon) {
      return icon;
    }
  }

  // Try different formats
  for (const format of formats) {
    const iconKey = format as keyof typeof simpleIcons;
    const icon = simpleIcons[iconKey] as SimpleIcon | undefined;
    if (icon && typeof icon === "object" && "hex" in icon) {
      return icon;
    }
  }

  return null;
}

// Filter and get available icons
const icons = brandNames
  .map((brand) => ({
    name: brand,
    data: getIconData(brand),
  }))
  .filter((icon) => icon.data !== null);

export default function Marquee() {
  // Duplicate icons multiple times for seamless infinite loop
  const duplicatedIcons = [...icons, ...icons];
  const animationRef = useRef<AnimationPlaybackControlsWithThen | null>(null);
  useEffect(() => {
    animationRef.current = animate(
      "#scroll-container-marquee",
      {
        x: "-180%",
      },
      { duration: 40, ease: "linear", repeat: Infinity, repeatType: "loop" }
    );
  }, []);

  return (
    <div className=" relative w-full overflow-hidden py-12 mt-25 lg:mt-30 select-none">
      {/* Mask effect - fade from left and right */}
      <div className=" absolute z-10 w-full h-full inset-0  pointer-events-none  bg-linear-to-r from-zinc-50 via-transparent to-zinc-50 dark:from-neutral-950/50 dark:via-transparent dark:to-neutral-950/50  lg:dark:from-neutral-950 lg:dark:via-neutral-transparent lg:dark:to-neutral-950 "></div>

      {/* Scrolling marquee */}
      <motion.div
        id="scroll-container-marquee"
        initial={{ x: "0%" }}
        className="flex   gap-8  lg:gap-16"
      >
        {duplicatedIcons.map((icon, index) => {
          if (!icon.data) return null;

          return (
            <div
              onMouseEnter={() => {
                if (animationRef.current) {
                  animationRef.current.pause();
                }
              }}
              onMouseLeave={() => {
                if (animationRef.current) {
                  animationRef.current.play();
                }
              }}
              key={`${icon.name}-${index}`}
              className="shrink-0 flex gap-2 items-center group justify-center cursor-pointer group "
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="size-8 lg:w-12 lg:h-12 opacity-100 fill-[#737373] group-hover:fill-[#fafafa] transition-all duration-300"
                // fill={`#737373`}
              >
                <title>{icon.data.title}</title>
                <path d={icon.data.path} />
              </svg>
              <div className="text-xl lg:text-2xl group-hover:text-neutral-50 transition-all duration-300 text-neutral-500 opacity-100  tracking-tight font-bold">
                {icon.data.title}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
