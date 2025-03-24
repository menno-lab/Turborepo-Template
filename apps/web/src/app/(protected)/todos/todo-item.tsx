"use client";

import { Todo } from "@repo/db/schema";
import { Button } from "@repo/ui/components/button";
import { Label } from "@repo/ui/components/label";
import { Checkbox } from "@repo/ui/components/checkbox";
import { Pencil, Trash2 } from "lucide-react";
import { toggleTodoDone, deleteTodo } from "./actions";
import Link from "next/link";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="flex items-center justify-between p-2 border rounded-md">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => toggleTodoDone(todo)}
          id={`todo-${todo.id}`}
        />
        <Label
          htmlFor={`todo-${todo.id}`}
          className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}
        >
          {todo.title}
        </Label>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/todos/${todo.id}`}>
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Link>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => deleteTodo(todo)}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </div>
    </li>
  );
}
