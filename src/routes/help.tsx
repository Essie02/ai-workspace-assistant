import { createFileRoute } from "@tanstack/react-router";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Guidance — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "How to write effective briefs, choose the right tone, and review AI-generated workplace content responsibly.",
      },
      { property: "og:title", content: "Help & Guidance — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Guidance for getting the best results from each AI productivity tool.",
      },
    ],
  }),
  component: HelpPage,
});

const FAQ = [
  {
    q: "How do I get the best results from the email generator?",
    a: "Give the model concrete facts rather than adjectives. Include figures, dates, names of deliverables and the exact decision you need. A brief with three specific details produces a materially stronger draft than one long, vague sentence.",
  },
  {
    q: "What does each tone option change?",
    a: "Professional is the neutral business default. Friendly softens the opening and closing. Formal uses conservative phrasing suited to legal or external correspondence. Persuasive emphasises benefit and urgency. Executive strips detail down to decision, impact and ask.",
  },
  {
    q: "How should I use the task planner output?",
    a: "Treat it as a first-pass planning document. Adjust the phases to your delivery cadence, replace placeholder owners with real names, and confirm the estimates with the people doing the work before you baseline anything.",
  },
  {
    q: "What is the difference between the research depths?",
    a: "Quick Summary returns the executive summary and conclusion only. Standard Analysis adds findings, trends, opportunities, risks and recommendations. Comprehensive Report additionally includes methodology, a 90-day roadmap and open stakeholder questions.",
  },
  {
    q: "Is my data stored anywhere?",
    a: "No. This application runs entirely in your browser. There is no account, no database and no server-side storage — closing the tab clears everything you entered.",
  },
  {
    q: "Can I edit generated content?",
    a: "Yes. Every output panel is editable in place. Use the toolbar to copy, regenerate, export as a text file, or clear the result and start again.",
  },
];

function HelpPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={HelpCircle}
        title="Help & Guidance"
        subtitle="Practical guidance for writing better briefs and reviewing AI output before it reaches colleagues or clients."
      />

      <section className="surface-panel p-6">
        <Accordion type="single" collapsible className="w-full">
          {FAQ.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm">{item.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <ResponsibleAiNotice />
    </div>
  );
}
