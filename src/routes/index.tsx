import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  ListChecks,
  Search,
  Sparkles,
  TrendingUp,
  FileText,
  Gauge,
  ArrowRight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ResponsibleAiNotice } from "@/components/ResponsibleAiNotice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks, generate professional content, and improve productivity with AI-powered email, planning and research tools.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "A premium AI workspace for professional emails, structured action plans and business research briefs.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Emails Generated", value: "1,284", delta: "+12.4% vs last month", icon: Mail },
  { label: "Tasks Planned", value: "376", delta: "+8.1% vs last month", icon: ListChecks },
  { label: "Research Reports", value: "92", delta: "+21.7% vs last month", icon: FileText },
  { label: "Productivity Score", value: "87", delta: "Top quartile", icon: Gauge },
];

const ACTIVITY = [
  { month: "Mar", output: 142, hours: 24 },
  { month: "Apr", output: 186, hours: 31 },
  { month: "May", output: 214, hours: 38 },
  { month: "Jun", output: 268, hours: 44 },
  { month: "Jul", output: 301, hours: 52 },
  { month: "Aug", output: 358, hours: 61 },
];

const BREAKDOWN = [
  { tool: "Email", runs: 128 },
  { tool: "Planner", runs: 76 },
  { tool: "Research", runs: 44 },
  { tool: "Other", runs: 19 },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="gradient-hero rounded-2xl border border-border p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-primary">
          <Sparkles className="h-4 w-4" />
          Enterprise AI workspace
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Welcome to AI Workplace Productivity Assistant
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Automate workplace tasks, generate professional content, and improve productivity with
          AI.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/email">
              <Mail className="h-4 w-4" /> Generate Email
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/tasks">
              <ListChecks className="h-4 w-4" /> Plan Tasks
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/research">
              <Search className="h-4 w-4" /> Start Research
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map(({ label, value, delta, icon: Icon }) => (
          <div
            key={label}
            className="card-hover rounded-2xl border border-border bg-card p-5 animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{label}</p>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3.5 w-3.5" />
              {delta}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="surface-panel p-5">
          <h2 className="text-sm font-semibold">AI output over time</h2>
          <p className="text-xs text-muted-foreground">Generated documents and hours saved</p>
          <div className="mt-5 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY}>
                <defs>
                  <linearGradient id="fillOutput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <RTooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-foreground)",
                  }}
                />
                <Area type="monotone" dataKey="output" stroke="var(--color-chart-1)" fill="url(#fillOutput)" strokeWidth={2} />
                <Area type="monotone" dataKey="hours" stroke="var(--color-chart-2)" fill="url(#fillHours)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-panel p-5">
          <h2 className="text-sm font-semibold">Tool usage this month</h2>
          <p className="text-xs text-muted-foreground">Runs per assistant</p>
          <div className="mt-5 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BREAKDOWN}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="tool" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <RTooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    color: "var(--color-foreground)",
                  }}
                />
                <Bar dataKey="runs" fill="var(--color-chart-1)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Weekly productivity target</span>
              <span>87%</span>
            </div>
            <Progress value={87} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { to: "/email" as const, title: "Smart Email Generator", desc: "Draft workplace emails with the right tone and a clear call to action.", icon: Mail },
          { to: "/tasks" as const, title: "AI Task Planner", desc: "Turn a goal into phases, milestones, risks and success metrics.", icon: ListChecks },
          { to: "/research" as const, title: "AI Research Assistant", desc: "Produce analyst-style briefs on any topic and industry.", icon: Search },
        ].map(({ to, title, desc, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="card-hover group rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/30">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-sm font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open tool
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </section>

      <ResponsibleAiNotice />
    </div>
  );
}
