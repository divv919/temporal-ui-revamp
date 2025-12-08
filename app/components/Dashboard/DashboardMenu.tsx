"use client";
import { motion } from "motion/react";
import { dashboardSections } from "@/app/lib/constants";
import { cn } from "@/app/lib/util";
import { DashboardSections } from "@/app/types/component";
import { Bookmark, ChartColumn, ChartPie, House } from "lucide-react";
import { useEffect, useState } from "react";

export default function DashboardMenu({
  setCurrentSection,
  currentSection,
}: {
  setCurrentSection: (section: DashboardSections) => void;
  currentSection: DashboardSections;
}) {
  const [iconSize, setIconSize] = useState(16); // Default to desktop size

  useEffect(() => {
    const checkSize = () => {
      setIconSize(window.innerWidth > 768 ? 16 : 12);
    };

    // Set initial size
    checkSize();

    // Listen for resize
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const sectionToIcon: Record<DashboardSections, React.ReactElement> = {
    "Starter Code": <House size={iconSize} />,
    Discover: <Bookmark size={iconSize} />,
    Enterprise: <ChartColumn size={iconSize} />,
    "Use Cases": <ChartPie size={iconSize} />,
  };

  return (
    <div className="tracking-tight text-sm text-neutral-500 h-fit w-full lg:h-full lg:w-[20%] flex lg:flex-col justify-between lg:justify-start  lg:gap-1 rounded-xl border border-neutral-800 bg-neutral-900  px-2  py-2 lg:px-0 lg:py-3">
      {dashboardSections.map((section, index) => {
        return (
          <div
            key={index}
            onClick={() => setCurrentSection(section)}
            className={cn(
              "flex  gap-0 lg:gap-2 items-center cursor-pointer relative px-1  pr-2 lg:px-4 w-fit  hover:text-neutral-200   py-1 transition-all duration-200 ease-in-out",
              currentSection === section && "text-neutral-50"
            )}
          >
            {" "}
            {currentSection === section && (
              <motion.div
                transition={{
                  layout: {
                    type: "spring",
                    damping: 20,
                    stiffness: 250,
                    mass: 0.7,
                  },
                }}
                layoutId="bg-dashboard-menu"
                className="absolute inset-0 w-full h-full   lg:pr-[8px]"
              >
                <div className="w-full h-full bg-linear-0 from-green-500 lg:mx-2 to-green-800 rounded-lg "></div>
              </motion.div>
            )}
            <span className="relative  z-[100] flex items-center lg:gap-2">
              <span
                className={cn(
                  "rounded-full p-1 bg-neutral-800 ",
                  "bg-transparent "
                )}
              >
                {sectionToIcon[section]}
              </span>
              <span className="text-[11px] lg:text-[14px] lg:block ">
                {section}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
