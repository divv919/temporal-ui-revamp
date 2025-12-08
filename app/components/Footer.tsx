"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { footerData } from "../lib/constants";
import Logo from "./Logo";
import { Send } from "lucide-react";

import { Youtube, Twitter, Github, Linkedin, Slack } from "lucide-react";
import { useEffect, useState } from "react";

export const socialIcons: Record<string, any> = {
  YouTube: Youtube,
  X: Twitter, // using Twitter icon instead of X
  GitHub: Github,
  LinkedIn: Linkedin,
  Slack: Slack,
};
export default function Footer() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const checkDesktop = () => {
      if (typeof window !== undefined && window.innerWidth <= 768) {
        setIsDesktop(false);
      } else {
        setIsDesktop(true);
      }
      window.addEventListener("resize", checkDesktop);
      return window.removeEventListener("resize", checkDesktop);
    };
  }, []);
  return (
    <div
      // initial={{ y: 150 }}
      // transition={{
      //   // delay: 0.,
      //   duration: 1.5,
      //   ease: [0, 0.71, 0.2, 1.01],
      // }}
      // whileInView={{ y: 0 }}
      className="relative mt-30  lg:mt-60 h-fit w-full px-4 "
    >
      <div className="tracking-tight px-4 lg:px-20 py-6 lg:py-10 bg-green-950/60 relative w-full h-full rounded-t-2xl flex flex-col gap-4">
        <div className="absolute -bottom-1/10   pointer-events-none  right-1/2 translate-x-1/2 opacity-3">
          <Logo size={200} />
        </div>
        <div className="flex justify-between  ">
          <div className="text-[12px] lg:text-lg font-mono border border-green-50/10 px-2 py-1">
            {footerData.status}
          </div>
          <div className="flex gap-4 ">
            {footerData.socialLinks.map((social, index) => {
              const Icon = socialIcons[social.name];
              return (
                <Link href={social.href} key={social.name + index}>
                  <button className="hover:text-green-300 cursor-pointer">
                    {<Icon size={isDesktop ? 22 : 18} />}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="h-fit w-full flex lg:flex-row flex-col gap-8 lg:gap-0 justify-between tracking-tight">
          {footerData.sections.map((st, index) => {
            return (
              <div
                key={st.title + index}
                className="flex flex-col gap-3 lg:gap-2"
              >
                <div className="text-lg lg:text-lg text-green-300 font-medium">
                  {st.title}
                </div>
                <div className="flex gap-2 lg:gap-1 flex-col font-light">
                  {st.links.map((link, index) => {
                    return (
                      <div
                        key={index + link.label}
                        className="text-md lg:text-lg text-green-50 hover:text-green-300 cursor-pointer"
                      >
                        <Link href={link.href}>
                          <div>{link.label}</div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="mb-10 mt-10 w-full">
          <div className="px-2 py-2 bg-neutral-600/40 mx-auto rounded-xl w-fit flex items-center gap-1">
            <input
              placeholder="Email Address"
              className="px-1 focus:outline-0"
            />
            <button className="shadow-[inset_0px_5px_5px_rgba(255,255,255,0.4)] rounded-md p-2 bg-green-700">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
