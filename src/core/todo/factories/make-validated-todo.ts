import { sanitizeStr } from "@/utils/sanitize-str";
import { validateTodoDescription } from "../schemas/validate-todo-description";
import { makeNewToDo } from "./make-new-todo";
import { TodoPresenter } from "../schemas/todo.contract";


export function makeValidatedTodo(description: string): TodoPresenter {
    const cleanDescription = sanitizeStr(description)
    const validatedDescription = validateTodoDescription(cleanDescription)

    if (validatedDescription.success) {
        return {
            success: true,
            todo: makeNewToDo(cleanDescription),
        };
    }

    return {
        success: false,
        errors: validatedDescription.errors
    }
}