import {
  CodeLanguages,
  DashboardSections,
  UseCaseTitle,
} from "../types/component";

export const headerTitle = "What if your code never failed?";
export const headerSubtitle =
  "Failures happen. Temporal makes them irrelevant. Build applications that never lose state, even when everything else fails.";

export const carousel = [
  {
    title: "Write code as if failure doesn’t exist",
    subtitle:
      "Distributed systems break, APIs fail, networks flake, and services crash. That’s not your problem anymore. Managing reliability shouldn’t mean constant firefighting.",
  },
  {
    title: "You have to see it to believe it",
    subtitle:
      "Temporal doesn’t work like anything you’ve used before. Watch how we guarantee the Durable Execution of your code in the face of any failure.",
  },
  {
    title: "Create failproof apps using our SDKs",
    subtitle:
      "Write your business logic in the programming languages you already use with our native SDKs. Your days of writing reconciliation logic or boilerplate code are over.",
  },
];

export const preFooter = {
  title: "Build invincible applications",
  subtitle: "It sounds like magic, we promise it's not.",
  buttons: [
    {
      name: "Documentation",
      href: "",
    },
    {
      name: "Code Base",
      href: "",
    },
    {
      name: "Samples",
      href: "",
    },
  ],
};

export const navbarConstants = {
  links: [
    {
      name: "Platform",
      href: "",
    },
    {
      name: "Docs",
      href: "",
    },
    {
      name: "Pricing",
      href: "",
    },
    {
      name: "Use cases",
      href: "",
    },
    {
      name: "Resources",
      href: "",
    },
    {
      name: "Github",
      href: "",
    },
  ],
  buttons: [
    {
      type: "secondary",
      name: "Signup",
      href: "",
    },
    {
      type: "primary",
      name: "Get Started",
      href: "",
    },
  ],
};

export const languages: CodeLanguages[] = [
  "Python",
  "Go",
  "Ruby",
  "Typescript",
  "Java",
  "PHP",
];

export const dashboardSections: DashboardSections[] = [
  "Starter Code",
  "Discover",
  "Use Cases",
  "Enterprise",
];

export const snippets = [
  {
    language: "Typescript",
    code: `// Send an email every 30 days, for the year
export async function sleepForDays(): Promise<void> {
  for (let i = 0; i < 12; i++) {
    // Activities have built-in support for timeouts and retries!
    await sendEmail();

    // Sleep for 30 days (yes, really)!
    await workflow.sleep('30 days');
  }
}
        `,
  },
  {
    language: "Python",
    code: `@workflow.defn
class SleepForDaysWorkflow:
    # Send an email every 30 days, for the year
    @workflow.run
    async def run(self) -> None:
        for i in range(12):
            # Activities have built-in support for timeouts and retries!
            await workflow.execute_activity(
                send_email,
                start_to_close_timeout=timedelta(seconds=10),
            )

            # Sleep for 30 days (yes, really)!
            await workflow.sleep(timedelta(days=30))
        `,
  },
  {
    language: "Go",
    code: `// Send an email every 30 days, for the year
func SleepForDaysWorkflow(ctx workflow.Context) error {
  for i := range 12 {
    // Activities have built-in support for timeouts and retries!
    _ = workflow.ExecuteActivity(ctx, SendEmail).Get(ctx, nil)

    // Sleep for 30 days (yes, really)!
    _ = workflow.Sleep(ctx, time.Hour*24*30)
  }
}
     `,
  },
  {
    language: "Ruby",
    code: `# Send an email every 30 days, for the year
class SleepForDaysWorkflow < Temporalio::Workflow::Definition
  def execute
    12.times do
      # Activities have built-in support for timeouts and retries!
      Temporalio::Workflow.execute_activity(
        SendEmailActivity,
        start_to_close_timeout: 10
      )

      # Sleep for 30 days (yes, really)!
      Temporalio::Workflow.sleep(30 * 24 * 60 * 60)
    end
  end
end`,
  },
  {
    language: "Java",
    code: `public class SleepForDaysWorklowImpl implements SleepForDaysWorkflow {
  // Send an email every 30 days, for the year
  public void sleepForDays() {
    for (int i = 0; i < 12; i++) {
      // Activities have built-in support for timeouts and retries!
      activity.sendEmail();

      // Sleep for 30 days (yes, really)!
      Workflow.sleep(Duration.ofDays(30));
    }
  }
}
        `,
  },
  {
    language: "PHP",
    code: `class SleepForDaysWorkflow implements SleepForDaysWorkflowInterface
{
  // Send an email every 30 days.
  public function sleepForDays(): void
  {
      for ($i = 0; $i < 12; $i++) {
          // Activities have timeouts, and will be retried by default!
          $this->sendEmailActivity->sendEmail();

          // Sleep for 30 days (yes, really)!
          Workflow::sleep(30 * 24 * 60 * 60)
      }
  }
}`,
  },
];

export const useCases: {
  title: UseCaseTitle;
  description: string;
}[] = [
  {
    title: "Agents, MCP, & AI Pipelines",
    description:
      "Develop agents that survive real-world chaos, reliable MCP & orchestrate training pipelines.",
  },
  {
    title: "Humans-in-the-Loop",
    description:
      "No more duct-taping Workflows around human input: just clean, durable orchestration.",
  },
  {
    title: "Compensating Patterns (Saga)",
    description: "Make Saga easy: what if Saga was simply a try...catch?",
  },
  {
    title: "Long-running Workflows",
    description:
      "Run Workflows for days, weeks, or months without losing progress or adding complexity.",
  },
  {
    title: "Order Fulfillment",
    description:
      "One bad service shouldn’t break the cart. Temporal keeps the order moving.",
  },
  {
    title: "Durable Ledgers",
    description:
      "Track transactions with code you can trust down to the last cent.",
  },
  {
    title: "CI/CD",
    description:
      "Deploy with confidence. Temporal gives you clean retries, rollbacks, and visibility.",
  },
  {
    title: "Customer Acquisition",
    description:
      "Route leads, onboard users, and engage customers without dropped steps or hacks.",
  },
  {
    title: "DAG",
    description:
      "Don’t glue together DAGs with bash and hope. Temporal does it right.",
  },
];

export const enterprises = [
  {
    title: "NVIDIA",
    description:
      "NVIDIA uses Temporal to automate and manage GPU workloads across multi-cloud environments, improving reliability and keeping large compute pipelines running smoothly.",
    href: "https://www.youtube.com/watch?v=HqGtUPLc_qI&t=1s",
    thumb: "/thumb_nvidia_2x.avif",
  },
  {
    title: "Salesforce",
    description:
      "Salesforce migrated their monolith to Temporal to handle long-running workflows more reliably, streamline processes, and modernize key parts of their internal systems.",
    href: "https://www.youtube.com/watch?v=1TDX9WEJRMA&t=1s",
    thumb: "/thumb_salesforce_2x.avif",
  },

  {
    title: "Descript",
    description:
      "Descript uses Temporal to stabilize their AI processing pipelines, reduce failures, and deliver a more consistent experience for their editing tools.",
    href: "Descript improved their AI uptime with Temporal",
    thumb: "/thumb_descript_2x.avif",
  },
];

export const sliderData = [
  {
    pretitle: "Committed to the open-source community",
    title: "100% open-source available on GitHub",
    description:
      "MIT-licensed, built fully in the open, and backed by a thriving developer community that continuously contributes features, improvements, and real-world expertise to the Temporal ecosystem, ensuring it stays transparent, reliable, and future-proof.",
    image:
      "https://images.ctfassets.net/0uuz8ydxyd9p/5URCP7ImlCFTve3Y00zFxx/4cdcce402d6322e27b3f3c0b60161de6/Open_Source_Image.svg",
  },
  // {
  //   pretitle: "As Reliable as Gravity",
  //   title: "Fully battle tested, 9 years in production",
  //   description:
  //     "Temporal was built with over 20 years of development from the minds behind AWS SQS, AWS SWF, Azure Durable functions, and the Cadence project that powers Uber.",
  //   image:
  //     "https://images.ctfassets.net/0uuz8ydxyd9p/1vkSkyOrLKPghmTI6oAWlf/7b140d3724c5a96251f2269762227e52/Frame_22.svg",
  // },
  {
    pretitle: "Designed for resilience",
    title: "Write Activities to handle and retry failure-prone logic",
    description:
      " APIs fail, networks time out, and users abandon sessions. Temporal treats these interactions as Activities: functions that retry automatically and recover seamlessly.",
    image:
      "https://images.ctfassets.net/0uuz8ydxyd9p/1Kx9Mb2lNos2PEbvIjy7S1/2957716a519e5c8923385f09fce67eea/Group_1000001988.svg",
  },
  {
    pretitle: "Improvements",
    title: "Replace your brittle state machines",
    description:
      "The Temporal Service persists the state of your application and has built-in retries, task queues, signals, and timers, to make sure your code always picks up where it left off.",
    image:
      "https://images.ctfassets.net/0uuz8ydxyd9p/65SSC5QL4KNrKD8cWZUv6H/c4fc6fe75e17a556325b2bacbc3f801c/Group_1000001864.svg",
  },
];

export const footerData = {
  status: "ALL SYSTEMS OPERATIONAL",

  socialLinks: [
    { name: "YouTube", href: "#" },
    { name: "X", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Slack", href: "#" },
  ],

  sections: [
    {
      title: "Discover",
      links: [
        { label: "Overview", href: "#" },
        { label: "How Temporal Works", href: "#" },
        { label: "Temporal Cloud", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Security", href: "#" },
        { label: "Trust Center", href: "#" },
        { label: "Startups", href: "#" },
      ],
    },

    {
      title: "Explore",
      links: [
        { label: "Customer Stories", href: "#" },
        { label: "Project-based tutorials", href: "#" },
        { label: "Example applications", href: "#" },
        { label: "Code Exchange", href: "#" },
        { label: "Replay 2025 Recap", href: "#" },
        { label: "Ask an expert", href: "#" },
        { label: "Blog", href: "#" },
      ],
    },

    {
      title: "Developers",
      links: [
        { label: "Getting Started with Temporal", href: "#" },
        { label: "Start building your next app", href: "#" },
        { label: "Temporal Cloud docs", href: "#" },
        { label: "Production deployments", href: "#" },
        { label: "Temporal 101", href: "#" },
        { label: "Temporal 102", href: "#" },
        { label: "Introduction to Temporal Cloud", href: "#" },
      ],
    },

    {
      title: "Community",
      links: [
        { label: "Join our Slack group", href: "#" },
        { label: "Find a meetup near you", href: "#" },
        { label: "Community forum", href: "#" },
        { label: "Events", href: "#" },
        { label: "Replay conference", href: "#" },
      ],
    },

    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "News", href: "#" },
        { label: "Contact us", href: "#" },
        { label: "Partners", href: "#" },
      ],
    },
  ],
};
