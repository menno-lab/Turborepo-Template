import { AppPage } from "@/components/app-page";
import { TodoForm } from "../todo-form";

export default function NewTodoPage() {
  return (
    <AppPage title="New Todo">
      <TodoForm />
    </AppPage>
  );
}
