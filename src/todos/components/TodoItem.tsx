"use client";

import { Todo } from "@/generated/prisma";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoCheckbox, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";

interface Props {
    todo: Todo;
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | null>;
}

const TodoItem = ({ todo, toggleTodo }: Props) => {

    const [optimisticTodo, toggleOptimisticTodo] = useOptimistic(todo, (state, newCompleteValue: boolean) => {
        return {
            ...state,
            complete: newCompleteValue,
        }
    })


    const onToggleTodo = async () => {
        try{
            startTransition( async ()=> {
                await toggleOptimisticTodo(!optimisticTodo.complete);
                await toggleTodo(optimisticTodo.id, !optimisticTodo.complete);
            })
            
        } catch (error) {
            toggleOptimisticTodo(!optimisticTodo.complete);
        }   
    }


  return (
    <div className={`${optimisticTodo.complete ? styles.todoDone : styles.todoPending} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div 
                // onClick={() => toggleTodo(optimisticTodo.id, !optimisticTodo.complete)}
                onClick={onToggleTodo}
                className={`flex p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${
              optimisticTodo.complete 
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" 
                : "bg-white border-2 border-red-400 text-red-500 hover:border-red-500 hover:bg-red-50"
            }`}>
                {optimisticTodo.complete ? (
                    <IoCheckboxOutline size={22} />
                ) : (
                    <IoSquareOutline size={22} />
                )}
            </div>
            
            <div className="text-center sm:text-left flex-1">
                <p className={`text-lg font-medium ${
                  optimisticTodo.complete ? "text-blue-700" : "text-red-700"
                }`}>
                    {optimisticTodo.description}
                </p>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              optimisticTodo.complete 
                ? "bg-blue-200 text-blue-800" 
                : "bg-red-200 text-red-800"
            }`}>
                {optimisticTodo.complete ? "✓ Completada" : "⏳ Pendiente"}
            </div>
        </div>
    </div>
  )
}

export default TodoItem