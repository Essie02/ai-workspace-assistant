import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Wand2 } from "lucide-react";
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
import { generateEmail } from "@/lib/ai-generators";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — AI Workplace Assistant" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with the right tone, structure and call to action in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — AI Workplace Assistant" },
      {
        property: "og:description",
        content: "Draft executive-ready workplace emails with AI assistance.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("Client");
  const [tone, setTone] = useState("Professional");
  const [details, setDetails] = useState("");
  const [length, setLength] = useState("Medium");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const run = () => {
    if (!purpose.trim()) {
      toast.error("Add an email purpose first");
      return;
    }
    setLoading(true);
    window.setTimeout(() => {
      const out = generateEmail({ purpose, recipient, tone, details, length });
      setSubject(out.subject);
      setBody(out.body);
      setLoading(false);
      toast.success("Email drafted");
    }, 1300);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={Mail}
        title="Smart Email Generator"
        subtitle="Turn a short brief into a polished, workplace-ready email with a clear subject line and call to action."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)]">
        <section className="surface-panel space-y-4 p-5">
          <div className="space-y-2">
            <Label htmlFor="purpose">Email purpose</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Requesting sign-off on the Q3 vendor contract"
            />
          </div>

          <div className="space-y-2">
            <Label>Recipient type</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Client", "Manager", "Executive Sponsor", "Team Member", "Vendor", "New Prospect"].map(
                  (r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tone</Label>
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
            <Label htmlFor="details">Key information</Label>
            <Textarea
              id="details"
              rows={6}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Contract value is £84k. Legal review completed on Tuesday. We need approval before the 14th to hold pricing."
            />
          </div>

          <div className="space-y-2">
            <Label>Desired length</Label>
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

          <Button onClick={run} disabled={loading} className="w-full">
            <Wand2 className="h-4 w-4" />
            {loading ? "Generating…" : "Generate email"}
          </Button>
        </section>

        <div className="space-y-6">
          {subject || loading ? (
            <div className="surface-panel p-5">
              <Label htmlFor="subject" className="text-xs uppercase tracking-wide text-muted-foreground">
                Subject line
              </Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-2 text-base font-medium"
                placeholder={loading ? "Drafting subject line…" : ""}
              />
            </div>
          ) : null}

          <AiOutputPanel
            title="Email content"
            value={body}
            onChange={setBody}
            loading={loading}
            onRegenerate={run}
            onClear={() => {
              setBody("");
              setSubject("");
            }}
            exportName="workplace-email"
            emptyHint="Fill in the brief on the left and generate a draft you can edit inline."
          />
          <ResponsibleAiNotice />
        </div>
      </div>
    </div>
  );
}
