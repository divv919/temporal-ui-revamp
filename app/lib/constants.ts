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
      name: "Get started",
      href: "",
    },
  ],
};

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
