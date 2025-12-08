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
import React, { useRef, useState } from "react";
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
    <div className="h-full  w-full rounded-xl bg-neutral-900  border border-neutral-800 ">
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
      setTimeout(() => setIsCopying(false), 3000);
    } catch (err) {
      console.warn(err);
    }
  };
  return (
    <div className="flex flex-col px-3 ">
      <div className="border-b border-neutral-800 flex justify-between items-center">
        <div
          className="relative flex items-center gap-2 text-sm tracking-tight font-light text-neutral-500 py-2"
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
                  "transition-colors duration-150",
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
                <Check size={16} />
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
                <Copy size={16} />
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

  // Blur and opacity logic: blur all children except the hovered one when parent is hovered
  const getBlurStyle = (index: number) => {
    if (!isParentHovered) return { filter: "blur(0px)", opacity: 1 };
    // When parent is hovered: blur all except the one being hovered
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
      className="gap-2 h-full p-3 grid grid-rows-3 grid-cols-3"
    >
      {/* Child 0 */}
      <motion.div
        animate={getBlurStyle(0)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(0)}
        onMouseLeave={() => setHoveredChild(null)}
        className="row-span-1 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-center gap-3 p-3"
      >
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-3/1 object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/1lQl33YaXWjGZHGCft4Ofs/189f974e93fdbd87e1a32d2a364289c1/Group_1000002002.svg"
          />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light text-center leading-5">
            Create failproof apps using our SDKs
          </div>
        </div>
      </motion.div>

      {/* Child 1 */}
      <motion.div
        animate={getBlurStyle(1)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(1)}
        onMouseLeave={() => setHoveredChild(null)}
        className="row-span-3 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-start gap-3 py-5 p-3"
      >
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-2/1 object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/7895g0MQaAct8ptqNaQUr7/84435f682e26b6085aa4d09e74537c16/Group_1000002050.svg"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
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

      {/* Child 2 */}
      <motion.div
        animate={getBlurStyle(2)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(2)}
        onMouseLeave={() => setHoveredChild(null)}
        className="row-span-2 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-start gap-3 py-5 p-3"
      >
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-2/1 object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/63LUyUOjLIba5sPuJWis9B/350ec813d63fbaa4e6360a6a95098545/Group_1000001977.svg"
          />
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
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

      {/* Child 3 */}
      <motion.div
        animate={getBlurStyle(3)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(3)}
        onMouseLeave={() => setHoveredChild(null)}
        className="row-span-2 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-start gap-3 py-5 p-3"
      >
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-2/1 object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/4CPlZLoV4BIvyRXCe7ISPd/7b0ce8673455f064f2b05a5ca1cae215/magic-new.svg"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
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

      {/* Child 4 */}
      <motion.div
        animate={getBlurStyle(4)}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHoveredChild(4)}
        onMouseLeave={() => setHoveredChild(null)}
        className="row-span-1 h-full select-none w-full rounded-xl bg-neutral-800 flex flex-col items-center justify-center gap-3 p-3"
      >
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-3/1 object-contain"
            src="https://images.ctfassets.net/0uuz8ydxyd9p/1YiCTIWs5UYzTv98YKzyK/6362b8f447f3ef62e8dd9a67d744b4dd/Happy_Laptop__2_.png?fm=avif&q=60"
          />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="text-neutral-100/80 tracking-normal text-md font-light text-center leading-5">
            Write code as if failure doesn't exist
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Enterprise() {
  return (
    <div className=" w-full h-full  p-3 flex  ">
      <div className="h-full  grid grid-rows-3 gap-2 ">
        {enterprises.map((ep, index) => (
          <div className="flex gap-4" key={index}>
            <div className="h-full aspect-video ">
              <Image
                src={ep.thumb}
                className="h-full aspect-video rounded-xl"
                alt={ep.title}
                height={180}
                width={300}
              />
            </div>
            <div className="flex flex-col gap-3">
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
  const useCaseIcons: Record<UseCaseTitle, React.ReactElement> = {
    "Agents, MCP, & AI Pipelines": <Workflow size={18} />,
    "Humans-in-the-Loop": <Users size={18} />,
    "Compensating Patterns (Saga)": <RotateCcwSquare size={18} />,
    "Long-running Workflows": <Timer size={18} />,
    "Order Fulfillment": <PackageCheck size={18} />,
    "Durable Ledgers": <Landmark size={18} />,
    "CI/CD": <GitCompare size={18} />,
    "Customer Acquisition": <UserPlus size={18} />,
    DAG: <Network size={18} />,
  };
  return (
    <div className=" grid grid-cols-3 grid-rows-3 h-full gap-2 p-3 select-none">
      {useCases.map((use, index) => (
        <motion.div
          initial={{
            scale: 1,
            y: 0,
            maskImage:
              "linear-gradient(to bottom, black 0%, black 10%, transparent 100%)",
          }}
          animate={{
            scale: 1,
            y: 0,
            maskImage:
              "linear-gradient(to bottom, black 0%, black 10%, transparent 100%)",
          }}
          whileHover={{
            y: -15,
            scale: 1.04,
            maskImage:
              "linear-gradient(to bottom, black 0%, black 75%, transparent 105%)",
          }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 350,
            mass: 1,
          }}
          style={{ willChange: "transform, mask-image" }}
          key={index}
          className="group flex flex-col gap-1 bg-neutral-800 rounded-xl p-3"
        >
          <div
            style={{ willChange: "transform" }}
            className="flex flex-col gap-1 items-start tracking-tight"
          >
            <div className="group-hover:text-neutral-50 text-neutral-300 transition-all duration-200 tracking-tight text-md font-light text-center leading-5 ">
              {useCaseIcons[use.title]}
            </div>

            <div className="text-neutral-100/80 tracking-tight text-md font-light text-center leading-5">
              {use.title}
            </div>
          </div>
          <div className="text-[15px] text-neutral-300/65 tracking-normal leading-5 font-light flex flex-col gap-1">
            {use.description}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
