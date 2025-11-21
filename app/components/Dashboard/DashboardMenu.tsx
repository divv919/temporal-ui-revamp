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
    <div className="tracking-tight text-sm text-neutral-500 h-full w-[20%] flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-0 py-3">
      {dashboardSections.map((section) => {
        return (
          <div
            onClick={() => setCurrentSection(section)}
            className={cn(
              "flex gap-2 items-center ",
              currentSection === section
                ? "bg-linear-0 gap-1 from-green-500 mx-2 to-green-800 px-2 py-1 rounded-md text-green-100"
                : "px-4"
            )}
          >
            <div
              className={cn(
                "rounded-full p-1 bg-neutral-800",
                "bg-transparent "
              )}
            >
              {sectionToIcon[section]}
            </div>{" "}
            {section}
          </div>
        );
      })}
    </div>
  );
}
