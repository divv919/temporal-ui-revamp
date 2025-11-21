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
  "checkr",
  "turo",
  "mollie",
  "kyte",
  "godaddy",
  "lovable",
  "hebbia",
  "snapchat",
  "kotak",
  "vodafone",
  "cloudflare",
  "gitlab",
  "bentley",
  "deloitte",
  "doordash",
  "retool",
];

// Fallback brands if some are not available
const fallbackBrands = [
  "github",
  "microsoft",
  "google",
  "apple",
  "amazon",
  "meta",
  "netflix",
  "spotify",
];

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
    deloitte: "siDeloitte",
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

  // Try fallback brands
  for (const fallback of fallbackBrands) {
    const fallbackKey = `si${
      fallback.charAt(0).toUpperCase() + fallback.slice(1)
    }` as keyof typeof simpleIcons;
    const fallbackIcon = simpleIcons[fallbackKey] as SimpleIcon | undefined;
    if (
      fallbackIcon &&
      typeof fallbackIcon === "object" &&
      "hex" in fallbackIcon
    ) {
      return fallbackIcon;
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
  const duplicatedIcons = [...icons, ...icons, ...icons, ...icons];

  return (
    <div className="relative w-full overflow-hidden py-12 mt-20">
      {/* Mask effect - fade from left and right */}
      <div className="absolute inset-0 z-10 pointer-events-none mask-x-from-10% mask-x-to-90% bg-linear-to-r from-zinc-50 via-transparent to-zinc-50 dark:from-neutral-950 dark:via-transparent dark:to-neutral-950"></div>

      {/* Scrolling marquee */}
      <div className="flex animate-marquee gap-16">
        {duplicatedIcons.map((icon, index) => {
          if (!icon.data) return null;

          return (
            <div
              key={`${icon.name}-${index}`}
              className="shrink-0 flex items-center justify-center"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 opacity-60 hover:opacity-100 transition-opacity"
                fill={`#${icon.data.hex}`}
              >
                <title>{icon.data.title}</title>
                <path d={icon.data.path} />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
