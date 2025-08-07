import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  await prisma.todo.deleteMany();

  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "user"],
      isActive: true,
      todos: {
        create: [
          {description: "Esmeralda Roja", complete: true},
          {description: "Esmeralda Verde", complete: false},
          {description: "Esmeralda Azul", complete: false},
          {description: "Esmeralda Amarilla", complete: false},
          {description: "Esmeralda Naranja", complete: false},
          {description: "Esmeralda Violeta", complete: false},
          {description: "Esmeralda Rosa", complete: false},
          {description: "Esmeralda Negra", complete: false},
          {description: "Esmeralda Blanca", complete: false},
        ]
      }
    }
  })
  // await prisma.todo.createMany({
  //     data: [
  //         {description: "Piedra del alma", complete: true},
  //         {description: "Piedra del tiempo", complete: false},
  //         {description: "Piedra del espacio", complete: false},
  //         {description: "Piedra del poder", complete: false},
  //         {description: "Piedra del mente", complete: false},
  //         {description: "Piedra del realidad", complete: false},
  //     ]
  // })

  return NextResponse.json(
    {
      message: "Seed Executed"
    }
  );
}

