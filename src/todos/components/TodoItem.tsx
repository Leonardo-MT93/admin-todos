import { Todo } from "@/generated/prisma";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoCheckbox, IoSquareOutline } from "react-icons/io5";

interface Props {
    todo: Todo;
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | null>;
}

const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div className={`${todo.complete ? styles.todoDone : styles.todoPending} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            <div 
                onClick={() => toggleTodo(todo.id, !todo.complete)}
            className={`flex p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${
              todo.complete 
                ? "bg-blue-500 text-white shadow-md hover:bg-blue-600" 
                : "bg-white border-2 border-red-400 text-red-500 hover:border-red-500 hover:bg-red-50"
            }`}>
                {todo.complete ? (
                    <IoCheckboxOutline size={22} />
                ) : (
                    <IoSquareOutline size={22} />
                )}
            </div>
            
            <div className="text-center sm:text-left flex-1">
                <p className={`text-lg font-medium ${
                  todo.complete ? "text-blue-700" : "text-red-700"
                }`}>
                    {todo.description}
                </p>
            </div>

            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
              todo.complete 
                ? "bg-blue-200 text-blue-800" 
                : "bg-red-200 text-red-800"
            }`}>
                {todo.complete ? "✓ Completada" : "⏳ Pendiente"}
            </div>
        </div>
    </div>
  )
}

export default TodoItem