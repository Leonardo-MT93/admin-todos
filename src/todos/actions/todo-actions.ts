"use server";

import { Todo } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const sleep = (seconds: number): Promise<boolean> => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {

 await sleep(3);

 const todo = await prisma.todo.findFirst({
    where: {
        id,
    },
 });

 if (!todo) {
    throw new Error("Todo not found");
 }
    
 const updatedTodo = await prisma.todo.update({
    where: {
        id,
    },
    data: {
        complete,
    },
 });

 revalidatePath("/dashboard/server-todos");

 return updatedTodo;

}


export const addTodo = async (description: string): Promise<Todo | {msg: string}> => {
    try{
        const todo = await prisma.todo.create({
            data: { 
                description,
            },
        });
        revalidatePath("/dashboard/server-todos");

        return todo
    } catch (error) {
        return {
            msg: "Error al crear el todo",
        }
    }
} 

export const deleteCompletedTodos = async (): Promise<void> => {

    try{
        const deletedTodos = await prisma.todo.deleteMany({
            where: { complete: true },
        });
        revalidatePath("/dashboard/server-todos");
    } catch (error) {
        throw new Error("Error al borrar los todos completados");
    }

}