import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <span>Hello, {session.user?.name}</span>
      {children}
    </div>
  );
}
