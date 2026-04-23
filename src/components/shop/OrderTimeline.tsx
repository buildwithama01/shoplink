import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type TimelineStep = {
  label: string;
  timestamp?: string;
  state: "complete" | "active" | "pending";
};

export function OrderTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="relative space-y-6">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={i} className="relative pl-10">
            {!isLast && (
              <span
                className={cn(
                  "absolute left-[15px] top-8 h-full w-px",
                  step.state === "complete" ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2",
                step.state === "complete" && "bg-primary border-primary text-primary-foreground",
                step.state === "active" && "bg-primary-soft border-primary text-primary",
                step.state === "pending" && "bg-background border-border text-muted-foreground",
              )}
            >
              {step.state === "complete" ? (
                <Check className="h-4 w-4" />
              ) : (
                <Circle className={cn("h-3 w-3", step.state === "active" && "fill-primary")} />
              )}
            </span>
            <div>
              <div
                className={cn(
                  "font-medium",
                  step.state === "pending" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {step.label}
              </div>
              {step.timestamp && (
                <div className="text-sm text-muted-foreground mt-0.5">{step.timestamp}</div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
