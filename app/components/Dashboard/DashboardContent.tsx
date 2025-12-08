"use client";
import {
  AnimatePresence,
  easeInOut,
  motion,
  useMotionValue,
} from "motion/react";
import { Check, ChevronRight, Copy, GithubIcon } from "lucide-react";
import CodeBlock from "../CodeBlock";
import {
  enterprises,
  languages,
  snippets,
  useCases,
} from "@/app/lib/constants";
import { cn } from "@/app/lib/util";
import {
  CodeLanguages,
  DashboardSections,
  UseCaseTitle,
} from "@/app/types/component";
import {
  Workflow,
  Users,
  RotateCcwSquare,
  Timer,
  PackageCheck,
  Landmark,
  GitCompare,
  UserPlus,
  Network,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../ui/button";

export default function DashboardContent({
  currentCodeLanguage,
  setCurrentCodeLanguage,
  currentSection,
  setCurrentSection,
}: {
  currentCodeLanguage: CodeLanguages;
  setCurrentCodeLanguage: (language: CodeLanguages) => void;
  setCurrentSection: (section: DashboardSections) => void;
  currentSection: DashboardSections;
}) {
  const sectionToComponent: Record<DashboardSections, React.ReactElement> = {
    "Starter Code": (
      <StarterCode
        currentCodeLanguage={currentCodeLanguage}
        setCurrentCodeLanguage={setCurrentCodeLanguage}
      />
    ),
    Discover: <Discover />,
    Enterprise: <Enterprise />,
    "Use Cases": <UseCases />,
  };

  return (
    <div className="h-131  lg:h-full  w-full rounded-xl bg-neutral-900  border border-neutral-800 ">
      {sectionToComponent[currentSection]}
    </div>
  );
}

function StarterCode({
  currentCodeLanguage,
  setCurrentCodeLanguage,
}: {
  currentCodeLanguage: CodeLanguages;
  setCurrentCodeLanguage: (language: CodeLanguages) => void;
}) {
  const [currentHover, setCurrentHover] = useState<CodeLanguages | null>(null);
  const [isCopying, setIsCopying] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check for desktop screen size
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);
  const handleCopy = async () => {
    if (isCopying) {
      return;
    }
    try {
      const textToCopy = snippets.filter(
        (snpt) => snpt.language === currentCodeLanguage
      )[0].code;
      setIsCopying(true);
      await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
      console.warn(err);
    } finally {
      setTimeout(() => setIsCopying(false), 3000);
    }
  };
  return (
    <div className="flex flex-col px-3 ">
      <div className="border-b border-neutral-800 flex justify-between items-center">
        <div
          className="relative flex items-center gap-1 lg:gap-2 text-sm tracking-tight font-light text-neutral-500 py-2"
          onMouseLeave={() => setCurrentHover(null)}
        >
          {languages.map((language, index) => {
            const isActive =
              currentHover === language ||
              (currentHover === null && currentCodeLanguage === language);
            return (
              <div
                onMouseEnter={() => setCurrentHover(language)}
                key={index}
                onClick={() => setCurrentCodeLanguage(language)}
                className={cn(
                  "transition-colors duration-150 text-xs lg:text-sm",
                  isActive && "text-neutral-50/70",
                  "relative cursor-pointer px-2 py-1"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="language-select-id"
                    className="bg-neutral-800 absolute inset-0 rounded-md"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{language}</span>
              </div>
            );
          })}
        </div>
        <div
          onClick={handleCopy}
          className=" cursor-pointer text-sm tracking-tight font-light text-neutral-500 px-2 hover:text-neutral-400 transition-all duration-200 ease-in-out"
        >
          <AnimatePresence mode="wait">
            {isCopying ? (
              <motion.div
                key={"check-icon-key"}
                initial={{
                  scale: 0.7,
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{
                  scale: 0.7,
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeInOut",
                }}
              >
                <Check size={isDesktop ? 16 : 14} />
              </motion.div>
            ) : (
              <motion.div
                key={"copy-icon-key"}
                initial={{
                  scale: 0.7,
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{
                  scale: 0.7,
                  opacity: 0,
                  filter: "blur(2px)",
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeInOut",
                }}
              >
                <Copy size={isDesktop ? 16 : 14} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="h-full w-full  my-2 rounded-xl">
        <CodeBlock
          language={
            snippets.filter((snpt) => snpt.language === currentCodeLanguage)[0]
              .language
          }
          code={
            snippets.filter((snpt) => snpt.language === currentCodeLanguage)[0]
              .code
          }
        />
      </div>
    </div>
  );
}

function Discover() {
  const [hoveredChild, setHoveredChild] = useState<number | null>(null);
  const [isParentHovered, setIsParentHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check for desktop screen size
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  // Blur and opacity logic: different behavior for mobile vs desktop
  const getBlurStyle = (index: number) => {
    if (!isDesktop) {
      // Mobile: only blur the hovered element itself
      if (hoveredChild === index) return { filter: "blur(2px)", opacity: 0.8 };
      return { filter: "blur(0px)", opacity: 1 };
    }
    // Desktop: blur all except the hovered one when parent is hovered
    if (!isParentHovered) return { filter: "blur(0px)", opacity: 1 };
    if (hoveredChild === index) return { filter: "blur(0px)", opacity: 1 };
    return { filter: "blur(2px)", opacity: 0.8 };
  };

  return (
    <motion.div
      onMouseEnter={() => setIsParentHovered(true)}
      onMouseLeave={() => {
        setIsParentHovered(false);
        setHoveredChild(null);
      }}
      className="gap-2 h-full p-2 lg:p-3 grid grid-cols-2 lg:grid-rows-3 lg:grid-cols-3 overflow-hidden"
    >
      {/* Child 0 - Mobile: Row 1, Desktop: Top-left */}
      <motion.div
        animate={!isDesktop ? {} : getBlurStyle(0)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(0)}
        onMouseLeave={() => setHoveredChild(null)}
        className="relative col-span-1 order-1 lg:col-span-1 lg:row-span-1 lg:order-0 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-center gap-3 p-2 lg:p-3 overflow-hidden min-h-0"
      >
        <motion.div
          animate={!isDesktop ? getBlurStyle(0) : {}}
          transition={{ duration: 0.2 }}
          className="w-full h-full lg:h-fit flex items-center justify-center min-h-0"
        >
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full h-full object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/1lQl33YaXWjGZHGCft4Ofs/189f974e93fdbd87e1a32d2a364289c1/Group_1000002002.svg"
          />
        </motion.div>
        {/* Mobile hover overlay */}
        <AnimatePresence>
          {hoveredChild === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute inset-0 bg-neutral-900/80 rounded-xl flex flex-col items-center justify-center p-2"
            >
              <div className="text-neutral-100/90 tracking-normal text-sm font-light text-center leading-5">
                Create failproof apps using our SDKs
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Desktop content */}
        <div className="hidden lg:flex flex-col gap-1 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light text-center leading-5">
            Create failproof apps using our SDKs
          </div>
        </div>
      </motion.div>

      {/* Child 1 - Mobile: Row 2, Desktop: Center column (tall) */}
      <motion.div
        animate={!isDesktop ? {} : getBlurStyle(1)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(1)}
        onMouseLeave={() => setHoveredChild(null)}
        className="relative col-span-1 order-3 lg:col-span-1 lg:row-span-3 lg:order-0 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-start gap-3 py-2 lg:py-5 p-2 lg:p-3 overflow-hidden min-h-0"
      >
        <motion.div
          animate={!isDesktop ? getBlurStyle(1) : {}}
          transition={{ duration: 0.2 }}
          className="w-full h-full lg:h-fit flex items-center justify-center min-h-0"
        >
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full h-full object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/7895g0MQaAct8ptqNaQUr7/84435f682e26b6085aa4d09e74537c16/Group_1000002050.svg"
          />
        </motion.div>
        {/* Mobile hover overlay */}
        <AnimatePresence>
          {hoveredChild === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute inset-0 bg-neutral-900/80 rounded-xl flex flex-col items-center justify-center p-2 gap-1"
            >
              <div className="text-neutral-100/90 tracking-normal text-sm font-light text-center leading-5">
                One platform, two great hosting paths
              </div>
              <div className="text-[13px] text-neutral-300/70 tracking-normal leading-4 font-light text-center">
                Open-source or Temporal Cloud hosting
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Desktop content */}
        <div className="hidden lg:flex flex-col gap-2 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light leading-5">
            One platform, two great hosting paths
          </div>
          <div className="text-[15px] text-neutral-300/65 tracking-normal leading-5 font-light flex flex-col gap-1">
            Temporal is an open-source project that you are free to use and host
            in your own environment. You can also let us host the Temporal
            Service for you with Temporal Cloud. Either way, we never see your
            code or internal workflow logic.
            <br />
            <span className="pt-1">
              Sign up for Temporal Cloud and get{" "}
              <span className="font-medium">$1,000</span> in{" "}
              <span className="font-medium">free</span> credits
            </span>
          </div>
          <motion.button
            whileHover="showArrow"
            initial="hideArrow"
            layout
            variants={{ showArrow: {}, hideArrow: {} }}
            className="cursor-pointer mt-2 flex gap-1 items-center w-fit text-neutral-300 text-sm font-light tracking-tight bg-neutral-600/50 px-2 py-1 rounded-xl shadow-[inset_0px_0px_5px_rgba(255,255,255,0.1)]"
          >
            Sign Up
            {
              <motion.span
                variants={{
                  showArrow: {
                    width: "15px",
                    opacity: 1,
                    filter: "blur(0px)",
                  },
                  hideArrow: {
                    width: "0px",
                    opacity: 0,

                    filter: "blur(2px)",
                  },
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.2,
                }}
              >
                <ChevronRight size={16} />
              </motion.span>
            }
          </motion.button>
        </div>
      </motion.div>

      {/* Child 2 - Mobile: Row 1, Desktop: Top-right (spans 2 rows) */}
      <motion.div
        animate={!isDesktop ? {} : getBlurStyle(2)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(2)}
        onMouseLeave={() => setHoveredChild(null)}
        className="relative col-span-1 order-2 lg:col-span-1 lg:row-span-2 lg:order-0 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col lg:flex-col items-center justify-start gap-3 py-2 lg:py-5 p-2 lg:p-3 overflow-hidden min-h-0"
      >
        <motion.div
          animate={!isDesktop ? getBlurStyle(2) : {}}
          transition={{ duration: 0.2 }}
          className="w-full h-full lg:h-fit flex items-center justify-center min-h-0"
        >
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full h-full object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/63LUyUOjLIba5sPuJWis9B/350ec813d63fbaa4e6360a6a95098545/Group_1000001977.svg"
          />
        </motion.div>
        {/* Mobile hover overlay */}
        <AnimatePresence>
          {hoveredChild === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute inset-0 bg-neutral-900/80 rounded-xl flex flex-col items-center justify-center p-2 gap-1"
            >
              <div className="text-neutral-100/90 tracking-normal text-sm font-light text-center leading-5">
                Replace your brittle state machines
              </div>
              <div className="text-[13px] text-neutral-300/70 tracking-normal leading-4 font-light text-center">
                Built-in retries, task queues, signals & timers
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Desktop content */}
        <div className="hidden lg:flex flex-col gap-4 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light leading-5">
            Replace your brittle state machines
          </div>
          <div className="text-[15px] text-neutral-300/65 tracking-normal leading-5 font-light flex flex-col gap-1">
            The Temporal Service persists the state of your application and has
            built-in retries, task queues, signals, and timers, to make sure
            your code always picks up where it left off.
          </div>
        </div>
      </motion.div>

      {/* Child 3 - Mobile: Row 3, Desktop: Bottom-left (spans 2 rows) */}
      <motion.div
        animate={!isDesktop ? {} : getBlurStyle(3)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(3)}
        onMouseLeave={() => setHoveredChild(null)}
        className="relative col-span-2 order-5 lg:col-span-1 lg:row-span-2 lg:order-0 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-start gap-3 py-2 lg:py-5 p-2 lg:p-3 overflow-hidden min-h-0"
      >
        <motion.div
          animate={!isDesktop ? getBlurStyle(3) : {}}
          transition={{ duration: 0.2 }}
          className="w-full h-full lg:h-fit flex items-center justify-center min-h-0"
        >
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full h-full object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/4CPlZLoV4BIvyRXCe7ISPd/7b0ce8673455f064f2b05a5ca1cae215/magic-new.svg"
          />
        </motion.div>
        {/* Mobile hover overlay */}
        <AnimatePresence>
          {hoveredChild === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute inset-0 bg-neutral-900/80 rounded-xl flex flex-col items-center justify-center p-2 gap-1"
            >
              <div className="text-neutral-100/90 tracking-normal text-sm font-light text-center leading-5">
                You have to see it to believe it
              </div>
              <div className="text-[13px] text-neutral-300/70 tracking-normal leading-4 font-light text-center">
                Durable Execution in the face of any failure
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Desktop content */}
        <div className="hidden lg:flex flex-col gap-2 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light leading-5">
            You have to see it to believe it
          </div>
          <div className="text-[15px] text-neutral-300/65 tracking-normal leading-5 font-light flex flex-col gap-1">
            Temporal doesn't work like anything you've used before. Watch how we
            guarantee the Durable Execution of your code in the face of any
            failure.
            <motion.button
              whileHover="showArrow"
              initial="hideArrow"
              layout
              variants={{ showArrow: {}, hideArrow: {} }}
              className=" mt-2 flex gap-1 items-center w-fit text-neutral-300 text-sm font-light tracking-tight bg-neutral-600/50 px-2 py-1 rounded-xl shadow-[inset_0px_0px_5px_rgba(255,255,255,0.1)]"
            >
              Watch Demo{" "}
              {
                <motion.span
                  variants={{
                    showArrow: {
                      width: "15px",
                      opacity: 1,
                      filter: "blur(0px)",
                    },
                    hideArrow: {
                      width: "0px",
                      opacity: 0,

                      filter: "blur(2px)",
                    },
                  }}
                >
                  <ChevronRight size={16} />
                </motion.span>
              }
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Child 4 - Mobile: Row 3, Desktop: Bottom-right */}
      <motion.div
        animate={!isDesktop ? {} : getBlurStyle(4)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(4)}
        onMouseLeave={() => setHoveredChild(null)}
        className="relative col-span-1 order-4 lg:col-span-1 lg:row-span-1 lg:order-0 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-center gap-3 p-2 lg:p-3 overflow-hidden min-h-0"
      >
        <motion.div
          animate={!isDesktop ? getBlurStyle(4) : {}}
          transition={{ duration: 0.2 }}
          className="w-full h-full lg:h-fit flex items-center justify-center min-h-0"
        >
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full h-full object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/1YiCTIWs5UYzTv98YKzyK/6362b8f447f3ef62e8dd9a67d744b4dd/Happy_Laptop__2_.png?fm=avif&q=60"
          />
        </motion.div>
        {/* Mobile hover overlay */}
        <AnimatePresence>
          {hoveredChild === 4 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden absolute inset-0 bg-neutral-900/80 rounded-xl flex flex-col items-center justify-center p-2"
            >
              <div className="text-neutral-100/90 tracking-normal text-sm font-light text-center leading-5">
                Write code as if failure doesn't exist
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* Desktop content */}
        <div className="hidden lg:flex flex-col gap-1 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light text-center leading-5">
            Write code as if failure doesn't exist
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Enterprise() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Check for desktop screen size
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div className=" w-full h-130 lg:h-full overflow-scroll lg:overflow-hidden mask-y mask-y-from-90% mask-y-to-110%  flex  ">
      <div className="  grid grid-rows-[auto_auto_auto] lg:grid-rows-3   ">
        {enterprises.map((ep, index) => (
          <div className="flex flex-col lg:flex-row gap-4 p-3" key={index}>
            <div className={cn("lg:h-full   aspect-video")}>
              <Image
                src={ep.thumb}
                className="lg:h-full w-full aspect-video rounded-xl"
                alt={ep.title}
                height={isDesktop ? 180 : 180}
                width={isDesktop ? 300 : 300}
              />
            </div>
            <div className="flex flex-col gap-3 h-fit">
              {/* <div className="h-10 w-10 bg-amber-200 "></div> */}

              <div className="flex flex-col gap-1">
                <div className="text-neutral-100/80 tracking-tight text-md font-light leading-5">
                  {ep.title}
                </div>
                <div className="text-[15px] text-neutral-300/65 tracking-normal leading-5 font-light flex flex-col gap-1">
                  {ep.description}
                </div>
              </div>
              <Link className="text-[12px]   w-fit" href={ep.href}>
                <motion.button
                  whileHover="showArrow"
                  initial="hideArrow"
                  layout
                  variants={{ showArrow: {}, hideArrow: {} }}
                  className="cursor-pointer mt-2 flex gap-1 items-center w-fit text-neutral-300 text-sm font-light tracking-tight bg-neutral-600/50 px-2 py-1 rounded-xl shadow-[inset_0px_0px_5px_rgba(255,255,255,0.1)]"
                >
                  {"Watch " + ep.title + "'s talk"}{" "}
                  {
                    <motion.span
                      variants={{
                        showArrow: {
                          width: "15px",
                          opacity: 1,
                          filter: "blur(0px)",
                        },
                        hideArrow: {
                          width: "0px",
                          opacity: 0,

                          filter: "blur(2px)",
                        },
                      }}
                      transition={{
                        ease: "easeOut",
                        duration: 0.2,
                      }}
                    >
                      <ChevronRight size={16} />
                    </motion.span>
                  }
                </motion.button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UseCases() {
  const [isDesktop, setIsDesktop] = useState(false);

  // Check for desktop screen size
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 768);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  const useCaseIcons: Record<UseCaseTitle, React.ReactElement> = {
    "Agents, MCP, & AI Pipelines": <Workflow size={!isDesktop ? 14 : 18} />,
    "Humans-in-the-Loop": <Users size={!isDesktop ? 14 : 18} />,
    "Compensating Patterns (Saga)": (
      <RotateCcwSquare size={!isDesktop ? 14 : 18} />
    ),
    "Long-running Workflows": <Timer size={!isDesktop ? 14 : 18} />,
    "Order Fulfillment": <PackageCheck size={!isDesktop ? 14 : 18} />,
    "Durable Ledgers": <Landmark size={!isDesktop ? 14 : 18} />,
    "CI/CD": <GitCompare size={!isDesktop ? 14 : 18} />,
    "Customer Acquisition": <UserPlus size={!isDesktop ? 14 : 18} />,
    DAG: <Network size={!isDesktop ? 14 : 18} />,
  };
  return (
    <div className=" grid grid-cols-2 h-full  mask-y mask-y-from-90% mask-y-to-110% overflow-scroll lg:overflow-hidden lg:grid-cols-3 lg:grid-rows-3  gap-2 p-3 select-none">
      {useCases.map((use, index) => (
        <motion.div
          initial={{
            scale: 1,
            y: 0,
            // maskImage:
            //   "linear-gradient(to bottom, black 0%, black 10%, transparent 100%)",
          }}
          animate={{
            scale: 1,
            y: 0,
            backgroundColor: "var(--color-neutral-800)",
            // maskImage:
            //   "linear-gradient(to bottom, black 0%, black 10%, transparent 100%)",
          }}
          whileHover={{
            // y: -15,
            scale: 1.06,
            zIndex: 10,
            backgroundColor: "var(--color-neutral-800)",

            // maskImage:
            //   "linear-gradient(to bottom, black 0%, black 75%, transparent 105%)",
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 350,
            mass: 1,
          }}
          style={{ willChange: "transform, mask-image" }}
          key={index}
          className="group flex relative flex-col gap-1 shadow-[0px_0px_20px_rgba(0,0,0,0.3)]   rounded-xl p-3"
        >
          <div
            style={{ willChange: "transform" }}
            className="flex flex-col gap-1 items-start tracking-tight"
          >
            <div className="hidden lg:block group-hover:text-neutral-50 text-neutral-300 transition-all duration-200 tracking-tight   text-md font-light  lg:text-center leading-5 ">
              {useCaseIcons[use.title]}
            </div>

            <div className="text-neutral-100/80 tracking-tight text-sm lg:text-lg font-light lg:text-start leading-5 text-start items-start justify-center ">
              {use.title}
            </div>
          </div>
          <div className=" text-[12px] lg:text-[15px] text-neutral-300/65 tracking-normal leading-4  lg:leading-5 font-light flex flex-col gap-1">
            {use.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
