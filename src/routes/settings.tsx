import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "AI Settings — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Configure default tone, output length, creativity and review preferences for AI-generated workplace content.",
      },
      { property: "og:title", content: "AI Settings — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Tune AI defaults for tone, length and review safeguards.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [creativity, setCreativity] = useState([45]);
  const [reviewReminder, setReviewReminder] = useState(true);
  const [autoCopy, setAutoCopy] = useState(false);
  const [compact, setCompact] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        icon={SettingsIcon}
        title="AI Settings"
        subtitle="Set the defaults applied across the email generator, task planner and research assistant."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="surface-panel space-y-6 p-6">
          <h2 className="text-sm font-semibold">Generation defaults</h2>

          <div className="space-y-2">
            <Label>Default tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Professional", "Friendly", "Formal", "Persuasive", "Executive"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Default output length</Label>
            <Select value={length} onValueChange={setLength}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Short", "Medium", "Long"].map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Creativity</Label>
              <span className="text-sm text-muted-foreground">{creativity[0]}%</span>
            </div>
            <Slider value={creativity} onValueChange={setCreativity} max={100} step={5} />
            <p className="text-xs text-muted-foreground">
              Lower values stay closer to conventional business phrasing; higher values vary
              structure and wording more.
            </p>
          </div>
        </section>

        <section className="surface-panel space-y-5 p-6">
          <h2 className="text-sm font-semibold">Workflow preferences</h2>
          <ToggleRow
            label="Human review reminder"
            hint="Show a review prompt before exporting AI output."
            checked={reviewReminder}
            onChange={setReviewReminder}
          />
          <ToggleRow
            label="Auto-copy on generate"
            hint="Copy each new result to the clipboard automatically."
            checked={autoCopy}
            onChange={setAutoCopy}
          />
          <ToggleRow
            label="Compact output view"
            hint="Reduce spacing in generated documents for denser reading."
            checked={compact}
            onChange={setCompact}
          />
          <Button className="w-full" onClick={() => toast.success("Preferences saved for this session")}>
            Save preferences
          </Button>
          <p className="text-xs text-muted-foreground">
            Settings apply to the current browser session only — this application stores no
            accounts or server-side data.
          </p>
        </section>
      </div>

      <ResponsibleAiNotice />
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-border bg-card/50 p-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
