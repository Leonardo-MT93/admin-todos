// "use client";

import prisma from "@/lib/prisma";
import TodosGrid from "@/todos/components/TodosGrid";
import { NewTodo } from "@/components/newTodo";
// import { useEffect } from "react";

export const metadata = {

    title: "Rest TODOS",
    description: "Rest TODOS",
}

export default async function RestTodosPage() {

    // useEffect(() => {
    //     fetch('/api/todos')
    //     .then(res => res.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }, []);

    const todos = await prisma.todo.findMany({ orderBy: { createdAt: "asc" } });

    return (
        <div>
            <div className="w-full px-3 mx-5 mb-5">
                <NewTodo />
            </div>
            {
                <TodosGrid todos={todos} />
            }
        </div>
    )
}