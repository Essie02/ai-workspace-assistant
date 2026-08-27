import { ShieldCheck } from "lucide-react";

export function ResponsibleAiNotice() {
  return (
    <div className="rounded-xl border border-warning/30 bg-warning/10 p-5">
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
        <div>
          <p className="text-sm font-semibold text-foreground">Responsible AI Notice</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            This application uses Artificial Intelligence to generate workplace content and
            recommendations. Outputs should be reviewed and verified before use in professional or
            business-critical situations. AI-generated content may occasionally contain
            inaccuracies and should not replace professional judgment.
          </p>
        </div>
      </div>
    </div>
  );
}
