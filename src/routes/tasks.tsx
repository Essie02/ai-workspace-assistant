import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ListChecks, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutputPanel } from "@/components/AiOutputPanel";
import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";
import { PageHeader } from "@/components/PageHeader";
import { generateTaskPlan } from "@/lib/ai-generators";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Convert any goal into a structured action plan with objectives, timeline, milestones, risks and success metrics.",
      },
      { property: "og:title", content: "AI Task Planner — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Turn goals into project-ready action plans in seconds.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("High");
  const [teamSize, setTeamSize] = useState("5");
  const [notes, setNotes] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const run = () => {
    if (!goal.trim()) {
      toast.error("Describe the goal first");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setPlan(generateTaskPlan({ goal, deadline, priority, teamSize, notes }));
      setLoading(false);
      toast.success("Action plan ready");
    }, 1400);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ListChecks}
        title="AI Task Planner"
        subtitle="Describe an objective and receive a structured delivery plan: phases, owners, milestones, dependencies and measurable outcomes."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <section className="surface-panel space-y-4 p-5">
          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Input
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Launch the customer onboarding portal"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Low", "Medium", "High", "Critical"].map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team">Team size</Label>
            <Input
              id="team"
              type="number"
              min={1}
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional notes</Label>
            <Textarea
              id="notes"
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Two engineers are shared with another programme. Legal review is required before launch."
            />
          </div>

          <Button onClick={run} disabled={loading} className="w-full">
            <Wand2 className="h-4 w-4" />
            {loading ? "Planning…" : "Generate action plan"}
          </Button>
        </section>

        <div className="space-y-6">
          <AiOutputPanel
            title="Structured action plan"
            value={plan}
            onChange={setPlan}
            loading={loading}
            onRegenerate={run}
            onClear={() => setPlan("")}
            exportName="action-plan"
            emptyHint="Add your goal, deadline and constraints to produce a full planning document."
          />
          <ResponsibleAiNotice />
        </div>
      </div>
    </div>
  );
}
