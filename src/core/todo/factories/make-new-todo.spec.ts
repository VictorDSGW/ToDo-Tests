import { makeNewToDo } from "./make-new-todo";

describe('makeNewToDo (unit)', () => {
    test('should return a new valid todo', () => {
        // AAA --> Arrange, Act, Assert
        // Arrange -> Criar as coisas que eu preciso
        const expectedTodo = {
            // id: 'any-id',
            id: expect.any(String),
            description: 'novo todo',
            // createdAt: new Date().toISOString()
            createdAt: expect.any(String)
        }
        
        // ToBe === | Valores Primitivos (número, string, etc)
        // ToEqual || ToStrictEqual | (Objetos)
        // Act -> Execultar a ação que está testando
        const newTodo = makeNewToDo('novo todo');
        
        // Assert -> Checar se o esperado aconteceu
        expect(newTodo.description).toBe(expectedTodo.description);
        // /\ Checando apenas o description
        
        // \/ Checando o objeto inteiro
        expect(newTodo).toStrictEqual(expectedTodo);
    });
});