interface AppPageProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function AppPage({ children, title, description }: AppPageProps) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
      {children}
    </div>
  );
}
