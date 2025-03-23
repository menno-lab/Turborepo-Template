import { AppPage } from "@/components/app-page";
import { FloatingActionButton } from "@/components/floating-action-button";
import { trpc } from "@/lib/trpc";
import { Plus } from "lucide-react";

export default async function TodosPage() {
  const todos = await trpc.todo.list();

  return (
    <AppPage title="Todos" className="relative h-full">
      <FloatingActionButton href="/todos/new">
        <Plus />
      </FloatingActionButton>
    </AppPage>
  );
}
