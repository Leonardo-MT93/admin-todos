// "use client";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import prisma from "@/lib/prisma";
import TodosGrid from "@/todos/components/TodosGrid";
import { NewTodo } from "@/todos/components/newTodo";
import { getUserServerSession } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";
// import { useEffect } from "react";

export const metadata = {

    title: "Rest TODOS",
    description: "Rest TODOS",
}

export default async function RestTodosPage() {    const user = await getUserServerSession()   

    if (!user) {
        redirect("/api/auth/signin")
    }


    const todos = await prisma.todo.findMany({ where: { userId: user?.id }, orderBy: { createdAt: "asc" } });


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