import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { todo } from "node:test";
import * as yup from "yup";

interface Segments {
    params: Promise<{ id: string }>;
}

interface Todo {
    id: string;
    description: string;
    complete: boolean;
}

const getTodo  = async ( id: string ):Promise<Todo | null> => {


    const todo = await prisma.todo.findFirst({
        where: { id: id },
    });
    if (!todo) {
        return null;
    }
    return todo;
}

export async function GET(request: NextRequest, { params }: Segments) {
    const { id } = await params;
    const todo = await getTodo(id);
    if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(todo);
}

const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
});

export async function PUT(request: NextRequest, { params }: Segments) {
    const { id } = await params;
    const todo = await getTodo(id);
    if (!todo) {
        return NextResponse.json({ error: "Todo not found" }, { status: 404 });
    }

    try {
        const { description, complete } = await putSchema.validate(await request.json());



        if (description) {
            todo.description = description;
        }
        if (complete) {
            todo.complete = complete;
        }

        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: { description, complete }
        });
        if (!updatedTodo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        return NextResponse.json(updatedTodo);

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 400 });
    }
}

