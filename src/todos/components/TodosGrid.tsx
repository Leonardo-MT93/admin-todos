'use client';

import { Todo } from "@/generated/prisma";
import TodoItem from "./TodoItem";
// import { Todo as TodoType } from "@prisma/client";
import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";


interface Props {
    todos?: Todo[];
}

const TodosGrid = ({ todos = [] }: Props) => {

    const router = useRouter();



    const toggleTodo = async (id: string, complete: boolean) => {
        const updatedTodo = await todosApi.updateTodo(id, complete);
        router.refresh();
        return updatedTodo;
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-3 gap-2">
        {
            todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            ))
        }
    </div>
  )
}

export default TodosGrid