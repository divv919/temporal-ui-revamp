"use client";

import * as simpleIcons from "simple-icons";

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

  return (
    <div className="mask-x-from-0% mask-x-to-100% relative w-full overflow-hidden py-12 mt-30">
      {/* Mask effect - fade from left and right */}
      <div className="absolute inset-0 z-10 pointer-events-none mask-x-from-10% mask-x-to-90% bg-linear-to-r from-zinc-50 via-transparent to-zinc-50 dark:from-neutral-950 dark:via-transparent dark:to-neutral-950"></div>

      {/* Scrolling marquee */}
      <div className="flex animate-marquee hover:animate-none gap-16">
        {duplicatedIcons.map((icon, index) => {
          if (!icon.data) return null;

          return (
            <div
              key={`${icon.name}-${index}`}
              className="shrink-0 flex gap-2 items-center group justify-center"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 opacity-100  "
                fill={`#fff`}
              >
                <title>{icon.data.title}</title>
                <path d={icon.data.path} />
              </svg>
              <div className="text-2xl text-white opacity-100  tracking-tight font-bold">
                {icon.data.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
