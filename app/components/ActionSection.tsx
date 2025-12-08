"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { preFooter } from "../lib/constants";
import { Book, Brackets, Code } from "lucide-react";

export default function ActionSection() {
  return (
    <motion.div
      initial={{
        y: 200,
      }}
      whileInView={{
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        // delay: 0.,
        duration: 1.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
      className="w-full h-100 px-25  mt-40"
    >
      <div className="w-full h-full shadow-green-500/10 shadow-xl tracking-tight bg-green-700/30 flex flex-col gap-0 justify-center items-center relative rounded-2xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 0.5,
          }}
          viewport={{ once: true }}
          className="absolute rounded-full h-180 w-270  blur-3xl bg-radial from-green-300/40  to-green-300/10 bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 1.3,
          }}
          viewport={{ once: true }}
          className="absolute rounded-full h-140 w-240  blur-3xl bg-radial from-yellow-300/30  to-green-300/10 bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2"
        ></motion.div>
        <div className="text-5xl text-green-50  relative">
          {preFooter.title}
        </div>
        <div className="text-lg text-green-200/90 relative mt-1">
          {preFooter.subtitle}
        </div>
        <div className="flex mt-4 gap-4 ">
          {preFooter.buttons.map((btn, index) => {
            return (
              <Link href={btn.href} key={btn.name + index}>
                <button className="cursor-pointer hover:bg-white/80 transition-colors duration-200 text-md bg-white/90 flex gap-1 items-center justify-center text-green-800 text-sm  font-medium px-2 shadow-[0px_10px_8px_rgba(0,0,0,0.08)]  py-2 rounded-xl relative">
                  {index === 0 ? (
                    <Book size={16} className="pb-[2px]" />
                  ) : index === 1 ? (
                    <Code size={16} className="pb-[2px]" />
                  ) : (
                    <Brackets size={16} className="pb-[2px]" />
                  )}
                  {btn.name}
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
