export default function Callout({
  children,
  emoji,
}: {
  children: React.ReactNode;
  emoji?: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-700 bg-card text-card-foreground shadow-sm p-4 flex items-center gap-3">
      {emoji ? emoji : "💡"}
      {children}
    </div>
  );
}
