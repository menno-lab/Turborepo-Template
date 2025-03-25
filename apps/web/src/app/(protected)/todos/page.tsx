import { AppPage } from "@/components/app-page";
import { FloatingActionButton } from "@/components/floating-action-button";
import { trpc } from "@/lib/trpc";
import { Plus } from "lucide-react";
import { TodoItem } from "./todo-item";

export default async function TodosPage() {
  const todos = await trpc.todo.list();

  return (
    <AppPage title="Todos" className="relative h-full">
      {!todos.length ? (
        <div className="flex h-full items-center justify-center">
          <p className="text-muted-foreground">No todos yet</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
      <FloatingActionButton href="/todos/new">
        <Plus />
      </FloatingActionButton>
    </AppPage>
  );
}
