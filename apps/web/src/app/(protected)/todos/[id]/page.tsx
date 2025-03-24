import { AppPage } from "@/components/app-page";
import { trpc } from "@/lib/trpc";
import { TodoForm } from "../todo-form";
import { updateTodoFormAction } from "../actions";

interface EditTodoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTodoPage({ params }: EditTodoPageProps) {
  const { id } = await params;
  const todo = await trpc.todo.get({ id: parseInt(id) });
  if (!todo) {
    return <div>Todo not found</div>;
  }
  return (
    <AppPage title="Edit Todo">
      <TodoForm
        formAction={updateTodoFormAction.bind(null, todo)}
        defaultValues={todo}
      />
    </AppPage>
  );
}
