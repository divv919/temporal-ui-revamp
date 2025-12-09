"use client";

import { useState } from "react";
import { CodeLanguages, DashboardSections } from "../../types/component";
import DashboardNav from "./DashboardNav";
import DashboardMenu from "./DashboardMenu";
import DashboardContent from "./DashboardContent";

export default function Dashboard() {
  const [currentSection, setCurrentSection] =
    useState<DashboardSections>("Starter Code");
  const [currentCodeLanguage, setCurrentCodeLanguage] =
    useState<CodeLanguages>("Python");
  return (
    <div className="selection:!text-black selection:bg-neutral-50  p-2 lg:p-3 bg-linear-90 from-neutral-950/5 via-neutral-50/15  to-neutral-950/5  backdrop-blur-3xl  shadow-[inset_0px_0px_5px_rgba(255,255,255,0.2)] relative  mx-auto h-170  rounded-[36px] w-full md:w-140 lg:w-250 overflow-hidden">
      {/* Gradient */}
      <div className="h-50 w-[60%] border-linear pointer-events-none  bg-neutral-50/10 rounded-full blur-3xl -translate-y-1/2 absolute top-0 left-1/2 -translate-x-1/2"></div>
      <div className="px-4 py-4  lg:px-8 lg:py-6 flex flex-col gap-4 lg:gap-8 h-full w-full rounded-[inherit] shadow-[0px_0px_3px_rgba(255,255,255,0.2)] bg-neutral-950">
        <DashboardNav />
        <div className="h-full flex lg:flex-row flex-col gap-3">
          <DashboardMenu
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          <DashboardContent
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            setCurrentCodeLanguage={setCurrentCodeLanguage}
            currentCodeLanguage={currentCodeLanguage}
          />
        </div>
      </div>
    </div>
  );
}
