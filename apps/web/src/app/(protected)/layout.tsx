import { getSession } from "@/lib/auth-client";
import Link from "next/link";
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
      <nav>
        <Link href="/todos">Todos</Link>
        <Link href="/todos/new">New</Link>
      </nav>
      <span>Hello, {session.user?.name}</span>
      {children}
    </div>
  );
}
