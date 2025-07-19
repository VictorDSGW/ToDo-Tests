import { validateTodoDescription } from "./validate-todo-description";

describe('validateTodoDescription (unit)', () => {
    test('deve retornar erros quando a descrição ter menos que 4 caracteres', () => {
        const description = 'abc';
        const reuslt = validateTodoDescription(description);
        expect(reuslt.errors).toStrictEqual(
            [
            'Descrição precisa ter mais de 3 caracteres',
            ])
        expect(reuslt.success).toBe(false)
    })

    test('deve retornar sucessos quando a descrição ter mais que 3 caracteres', () => {
        const description = 'abcd';
        const result = validateTodoDescription(description);

        expect(result.errors).toStrictEqual([])
        expect(result.success).toBe(true)
    })
});