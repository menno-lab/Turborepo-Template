import { Button } from "@repo/ui/components/button";
import Link from "next/link";

interface FloatingActionButtonProps {
  href: string;
  children?: React.ReactNode;
}

export function FloatingActionButton({
  children,
  href,
}: FloatingActionButtonProps) {
  return (
    <Button
      size="icon"
      asChild
      className="absolute bottom-4 right-4 size-12 rounded-full"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}
