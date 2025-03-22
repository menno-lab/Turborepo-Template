import { trpc } from "@/lib/trpc";

export default async function TodosPage() {
  const todos = await trpc.todo.list();

  return <div>Dashboard</div>;
}
