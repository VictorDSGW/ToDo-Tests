import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidatedTodo } from "./make-validated-todo";
import * as makeNewTodoMod from "./make-new-todo";
import * as validateTodoDescriptionMod from "../schemas/validate-todo-description";
import { InvalidTodo, ValidTodo } from "../schemas/todo.contract";

describe('makeValidatedTodo (unit)', () => {
    test('Should call sanitizeStr function with correct value', () => {
        // Mockar (Mock) -> Subistituir alguma coisa temporariamente
        // spyOn -> Interceptar e verificar
        // Arrange
        const { description, sanitizeStrSpy } = makeMocks();

        // Act
        makeValidatedTodo(description);
        
        // Assert
        expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
        expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
        expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
    });
    
    test('Should call validateTodoDescription with return sanitizeStr', () => {
        const { description, sanitizeStrSpy, validateTodoDescriptionSpy } = makeMocks();
        const sanitizeStrReturn = 'Retorno da sanitizeStr';
        sanitizeStrSpy.mockReturnValue(sanitizeStrReturn);

        makeValidatedTodo(description) as ValidTodo;

        expect(validateTodoDescriptionSpy).toHaveBeenCalledExactlyOnceWith(sanitizeStrReturn);
    });
    
    test('Should call makeNewTodo if validateTodoDescription return success', () => {
        const { description } = makeMocks();

        const result = makeValidatedTodo(description) as ValidTodo;
        // console.log(result);

        expect(result.success).toBe(true);
        expect(result.todo.createdAt)
        .toMatch(/^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z/); // '2025-07-27T15:06:47.153Z'
        expect(result.todo).toStrictEqual(
            expect.objectContaining({
                description: "abcd",
                id: "any-id",
                createdAt: expect.any(String),
            }),
        );
    });
    
    test('Should call return validate TodoDescription.error if validation fails', () => {
        const { errors, description, validateTodoDescriptionSpy } = makeMocks();
        validateTodoDescriptionSpy.mockReturnValue({ errors, success: false });

        const result = makeValidatedTodo(description) as InvalidTodo;
        // console.log(result);

        expect(result).toStrictEqual({ errors, success: false });
    });
});

const makeMocks = (description = 'abcd') => {
    const errors = ['any', 'error'];

    const todo = {
        id: 'any-id',
        description,
        createdAt: new Date().toISOString(),
    };

    const sanitizeStrSpy = vi
    .spyOn(sanitizeStrMod, 'sanitizeStr')
    .mockReturnValue(description);

    const validateTodoDescriptionSpy = vi
    .spyOn(validateTodoDescriptionMod, 'validateTodoDescription')
    .mockReturnValue({
        errors: [],
        success: true,
    });

    const makeNewTodoSpy = vi
    .spyOn(makeNewTodoMod, 'makeNewToDo')
    .mockReturnValue(todo);

    return {
        todo,
        errors,
        description,
        sanitizeStrSpy,
        validateTodoDescriptionSpy,
        makeNewTodoSpy
    }
};