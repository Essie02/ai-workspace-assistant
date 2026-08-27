import { Copy, Download, RefreshCw, Trash2, Pencil, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = {
  title: string;
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
  onRegenerate: () => void;
  onClear: () => void;
  exportName?: string;
  emptyHint: string;
};

export function AiOutputPanel({
  title,
  value,
  onChange,
  loading,
  onRegenerate,
  onClear,
  exportName,
  emptyHint,
}: Props) {
  const [editing, setEditing] = useState(true);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    toast.success("Copied to clipboard");
  };

  const exportTxt = () => {
    const blob = new Blob([value], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName ?? "ai-output"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported as text file");
  };

  return (
    <section className="surface-panel flex min-h-[420px] flex-col overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">
            {value ? `${value.length.toLocaleString()} characters` : "No output yet"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <ToolButton label="Copy" onClick={copy} disabled={!value || loading}>
            <Copy className="h-4 w-4" />
          </ToolButton>
          <ToolButton
            label={editing ? "Lock editing" : "Edit"}
            onClick={() => setEditing((e) => !e)}
            disabled={!value || loading}
          >
            {editing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </ToolButton>
          <ToolButton label="Regenerate" onClick={onRegenerate} disabled={loading}>
            <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          </ToolButton>
          {exportName ? (
            <ToolButton label="Export" onClick={exportTxt} disabled={!value || loading}>
              <Download className="h-4 w-4" />
            </ToolButton>
          ) : null}
          <ToolButton label="Clear" onClick={onClear} disabled={!value || loading}>
            <Trash2 className="h-4 w-4" />
          </ToolButton>
        </div>
      </header>

      <div className="flex-1 p-5">
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-primary">
              <span className="flex gap-1">
                <Dot delay="0ms" />
                <Dot delay="150ms" />
                <Dot delay="300ms" />
              </span>
              AI is drafting your content…
            </div>
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full bg-muted" style={{ width: `${95 - i * 6}%` }} />
            ))}
          </div>
        ) : value ? (
          <Textarea
            value={value}
            readOnly={!editing}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[340px] resize-y whitespace-pre-wrap border-border bg-background/40 font-mono text-[13px] leading-relaxed"
          />
        ) : (
          <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
              <RefreshCw className="h-5 w-5 text-primary" />
            </div>
            <p className="text-sm font-medium">Nothing generated yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyHint}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
      style={{ animationDelay: delay }}
    />
  );
}

function ToolButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="sm" onClick={onClick} disabled={disabled}>
          {children}
          <span className="ml-1.5 hidden sm:inline">{label}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}
