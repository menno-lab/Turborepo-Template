import { cn } from "@repo/ui/lib/utils";

interface AppPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function AppPage({
  children,
  title,
  description,
  className,
}: AppPageProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
