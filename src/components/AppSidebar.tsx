import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  ListChecks,
  Search,
  Settings,
  HelpCircle,
  Sparkles,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email Generator", icon: Mail },
  { to: "/tasks", label: "AI Task Planner", icon: ListChecks },
  { to: "/research", label: "AI Research Assistant", icon: Search },
  { to: "/settings", label: "AI Settings", icon: Settings },
  { to: "/help", label: "Help", icon: HelpCircle },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              active
                ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-[var(--shadow-glow)]"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-6 py-6">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 ring-1 ring-primary/40">
        <Sparkles className="h-5 w-5 text-primary" />
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-foreground">AI Workplace</p>
        <p className="text-xs text-muted-foreground">Productivity Assistant</p>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <Brand />
      <NavList />
      <div className="mt-auto p-4">
        <div className="rounded-xl border border-border bg-card/60 p-4">
          <p className="text-xs font-semibold text-foreground">Human review required</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Always verify AI output before business-critical use.
          </p>
        </div>
      </div>
    </aside>
  );
}

export function MobileTopBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Brand />
          <NavList onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">AI Workplace Assistant</span>
      </div>
    </div>
  );
}
