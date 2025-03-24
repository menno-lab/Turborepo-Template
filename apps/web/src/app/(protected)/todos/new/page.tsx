import { AppPage } from "@/components/app-page";
import { TodoForm } from "../todo-form";
import { createTodoFormAction } from "../actions";

export default function NewTodoPage() {
  return (
    <AppPage title="New Todo">
      <TodoForm formAction={createTodoFormAction} />
    </AppPage>
  );
}
