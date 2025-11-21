import { ChevronRight, Copy, GithubIcon } from "lucide-react";
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
import React from "react";
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
  return (
    <div className="flex flex-col px-3 ">
      <div className="border-b border-neutral-800 flex justify-between items-center">
        <div className=" flex items-center gap-4 text-sm tracking-tight font-light text-neutral-500 py-2">
          {languages.map((language) => {
            return (
              <div
                onClick={() => {
                  setCurrentCodeLanguage(language);
                }}
                className={cn(
                  currentCodeLanguage === language &&
                    "px-2 py-1 bg-neutral-800 rounded-md"
                )}
              >
                {language}
              </div>
            );
          })}
        </div>
        <div className="text-sm tracking-tight font-light text-neutral-500  px-2">
          <Copy size={16} />
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
  return (
    <div className="gap-2 h-full p-3 grid grid-rows-3 grid-cols-3">
      <div className="row-span-1 h-full w-full rounded-xl bg-neutral-800  flex flex-col items-center justify-center gap-3  p-3">
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-3/1 object-contain "
            src="https://images.ctfassets.net/0uuz8ydxyd9p/1lQl33YaXWjGZHGCft4Ofs/189f974e93fdbd87e1a32d2a364289c1/Group_1000002002.svg"
          />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="text-neutral-300/80 tracking-tight text-md font-light text-center leading-5 ">
            Create failproof apps using our SDKs
          </div>
        </div>
      </div>
      <div className="row-span-3 h-full w-full rounded-xl bg-neutral-800  flex flex-col items-center justify-start gap-3 py-5  p-3">
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-2/1 object-contain "
            src="https://images.ctfassets.net/0uuz8ydxyd9p/7895g0MQaAct8ptqNaQUr7/84435f682e26b6085aa4d09e74537c16/Group_1000002050.svg"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="text-neutral-300/80 tracking-tight text-md font-light  leading-5 ">
            One platform, two great hosting paths
          </div>
          <div className="text-sm text-neutral-400/80  tracking-tight font-light flex flex-col gap-1">
            Temporal is an open-source project that you are free to use and host
            in your own environment. You can also let us host the Temporal
            Service for you with Temporal Cloud. Either way, we never see your
            code or internal workflow logic.
            <br></br>
            <span className="pt-1">
              {" "}
              Sign up for Temporal Cloud and get{" "}
              <span className="font-medium">$1,000</span> in{" "}
              <span className="font-medium">free</span> credits
            </span>{" "}
          </div>
          <button className="flex gap-1 items-center w-fit text-sm font-light tracking-tight bg-neutral-600/50 px-2 py-1 rounded-xl shadow-[inset_0px_0px_5px_rgba(255,255,255,0.1)]">
            Sign Up <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="row-span-2 h-full w-full rounded-xl bg-neutral-800  flex flex-col items-center justify-start gap-3 py-5  p-3">
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-2/1 object-contain "
            src="https://images.ctfassets.net/0uuz8ydxyd9p/63LUyUOjLIba5sPuJWis9B/350ec813d63fbaa4e6360a6a95098545/Group_1000001977.svg"
          />
        </div>
        <div className="flex flex-col gap-4 overflow-hidden">
          <div className="text-neutral-300/80 tracking-tight text-md font-light  leading-5 ">
            Replace your brittle state machines
          </div>
          <div className="text-sm text-neutral-400/80  tracking-tight font-light flex flex-col gap-1">
            The Temporal Service persists the state of your application and has
            built-in retries, task queues, signals, and timers, to make sure
            your code always picks up where it left off.
          </div>
        </div>
      </div>{" "}
      <div className="row-span-2 h-full w-full rounded-xl bg-neutral-800  flex flex-col items-center justify-start gap-3 py-5  p-3">
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-2/1 object-contain "
            src="https://images.ctfassets.net/0uuz8ydxyd9p/4CPlZLoV4BIvyRXCe7ISPd/7b0ce8673455f064f2b05a5ca1cae215/magic-new.svg"
          />
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="text-neutral-300/80 tracking-tight text-md font-light  leading-5 ">
            You have to see it to believe it
          </div>
          <div className="text-sm text-neutral-400/80  tracking-tight font-light flex flex-col gap-1">
            Temporal doesn’t work like anything you’ve used before. Watch how we
            guarantee the Durable Execution of your code in the face of any
            failure.
            <button className=" mt-2 flex gap-1 items-center w-fit text-neutral-300 text-sm font-light tracking-tight bg-neutral-600/50 px-2 py-1 rounded-xl shadow-[inset_0px_0px_5px_rgba(255,255,255,0.1)]">
              Watch Demo <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="row-span-1 h-full w-full rounded-xl bg-neutral-800  flex flex-col items-center justify-center gap-3  p-3">
        <div>
          <Image
            alt="laptop"
            width={300}
            height={100}
            className="w-full aspect-3/1 object-contain "
            src="https://images.ctfassets.net/0uuz8ydxyd9p/1YiCTIWs5UYzTv98YKzyK/6362b8f447f3ef62e8dd9a67d744b4dd/Happy_Laptop__2_.png?fm=avif&q=60"
          />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="text-neutral-300/80 tracking-tight text-md font-light text-center leading-5 ">
            Write code as if failure doesn’t exist
          </div>
        </div>
      </div>
    </div>
  );
}

function Enterprise() {
  return (
    <div className=" w-full h-full  p-3 flex  ">
      <div className="h-full  grid grid-rows-3 gap-2 ">
        {enterprises.map((ep) => (
          <div className="flex gap-4">
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
                <div className="text-neutral-300 tracking-tight text-md font-light  leading-5 ">
                  {ep.title}
                </div>
                <div className="text-sm text-neutral-400 font-light">
                  {ep.description}
                </div>
              </div>
              <Link className="text-[12px]   w-fit" href={ep.href}>
                <button className="flex gap-1 items-center w-fit  font-light tracking-tight bg-neutral-600/50 px-2 py-1 rounded-xl shadow-[inset_0px_0px_5px_rgba(255,255,255,0.1)]">
                  {"Watch " + ep.title + "'s talk"}
                </button>
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
    <div className=" grid grid-cols-3 grid-rows-3 h-full gap-2 p-3 ">
      {useCases.map((use) => (
        <div className="mask-b mask-b-from-10% mask-b-to-100% flex flex-col gap-1 bg-neutral-800  rounded-xl p-3 ">
          <div className="flex flex-col gap-1 items-start tracking-tight">
            <div className="text-neutral-300 tracking-tight text-md font-light text-center leading-5 ">
              {useCaseIcons[use.title]}
            </div>

            <div className="text-neutral-300 tracking-tight text-md font-light text-center leading-5 ">
              {use.title}
            </div>
          </div>
          <div className="text-neutral-400 text-sm tracking-tight">
            {use.description}
          </div>
        </div>
      ))}
    </div>
  );
}
