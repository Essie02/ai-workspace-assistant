import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Wand2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { generateResearch } from "@/lib/ai-generators";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Produce business research briefs with executive summary, findings, trends, risks and recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Analyst-style research summaries for any topic and industry.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [industry, setIndustry] = useState("");
  const [depth, setDepth] = useState("Standard Analysis");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const run = () => {
    if (!topic.trim()) {
      toast.error("Enter a research topic first");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      setReport(generateResearch({ topic, industry, depth }));
      setLoading(false);
      toast.success("Research brief generated");
    }, 1600);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Search}
        title="AI Research Assistant"
        subtitle="Generate analyst-grade research briefs covering findings, industry trends, opportunities, risks and clear recommendations."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <section className="surface-panel space-y-4 p-5">
          <div className="space-y-2">
            <Label htmlFor="topic">Research topic</Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="AI-assisted claims processing"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Insurance"
            />
          </div>

          <div className="space-y-2">
            <Label>Research depth</Label>
            <Select value={depth} onValueChange={setDepth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Quick Summary", "Standard Analysis", "Comprehensive Report"].map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={run} disabled={loading} className="w-full">
            <Wand2 className="h-4 w-4" />
            {loading ? "Researching…" : "Generate research"}
          </Button>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Depth affects structure: quick summaries return headline findings, comprehensive
            reports add methodology, a 90-day roadmap and stakeholder questions.
          </p>
        </section>

        <div className="space-y-6">
          <AiOutputPanel
            title="Research brief"
            value={report}
            onChange={setReport}
            loading={loading}
            onRegenerate={run}
            onClear={() => setReport("")}
            exportName="research-brief"
            emptyHint="Enter a topic and industry to generate a structured business research report."
          />
          <ResponsibleAiNotice />
        </div>
      </div>
    </div>
  );
}
