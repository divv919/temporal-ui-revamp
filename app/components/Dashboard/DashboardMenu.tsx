"use client";
import { motion } from "motion/react";
import { dashboardSections } from "@/app/lib/constants";
import { cn } from "@/app/lib/util";
import { DashboardSections } from "@/app/types/component";
import { Bookmark, ChartColumn, ChartPie, House } from "lucide-react";

const sectionToIcon: Record<DashboardSections, React.ReactElement> = {
  "Starter Code": <House size={16} />,
  Discover: <Bookmark size={16} />,
  Enterprise: <ChartColumn size={16} />,
  "Use Cases": <ChartPie size={16} />,
};

export default function DashboardMenu({
  setCurrentSection,
  currentSection,
}: {
  setCurrentSection: (section: DashboardSections) => void;
  currentSection: DashboardSections;
}) {
  return (
    <div className="tracking-tight text-sm text-neutral-500 h-full w-[20%] flex flex-col gap-1 rounded-xl border border-neutral-800 bg-neutral-900 px-0 py-3">
      {dashboardSections.map((section, index) => {
        return (
          <div
            key={index}
            onClick={() => setCurrentSection(section)}
            className={cn(
              "flex gap-2 items-center cursor-pointer relative px-4 w-fit bg-transparent hover:text-neutral-200   py-1 transition-all duration-200 ease-in-out",
              currentSection === section && "text-neutral-50"
              // ? "bg-linear-0 gap-1 from-green-500 mx-2 to-green-800 px-2 flex-nowrap py-1 rounded-md text-green-100"
            )}
          >
            {" "}
            {currentSection === section && (
              <motion.div
                transition={{
                  layout: {
                    // duration: 0.2,
                    type: "spring",
                    damping: 20,
                    stiffness: 250,
                    mass: 0.7,
                  },
                }}
                layoutId="bg-dashboard-menu"
                className="absolute inset-0 w-full h-full  pr-[8px]"
              >
                <div className="w-full h-full bg-linear-0 from-green-500 mx-2 to-green-800 rounded-lg"></div>
              </motion.div>
            )}
            <span className="relative z-[100] flex items-center gap-2">
              <span
                className={cn(
                  "rounded-full p-1 bg-neutral-800 ",
                  "bg-transparent "
                )}
              >
                {sectionToIcon[section]}
              </span>{" "}
              {section}
            </span>
          </div>
        );
      })}
    </div>
  );
}
