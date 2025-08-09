import { insertTestTodos, makeTestTodoRepository } from "@/core/__tests__/utils/make-todo-repository";

describe('DrizzleTodoRepository (integration)', () => {
    beforeEach(async () => {
        const { deleteTodoNoWhere } = await makeTestTodoRepository();
        await deleteTodoNoWhere();
    });

    afterAll(async () => {
        const { deleteTodoNoWhere } = await makeTestTodoRepository();
        await deleteTodoNoWhere();
    });

    describe('findAll', () => {
        test('should return an empty array if the table is clean', async () => {
            const { repository } = await makeTestTodoRepository();
            // console.log(drizzleDatabase.db.$client.name); // .int.test.db.sqlite3

            const result = await repository.findAll();
            
            expect(result).toHaveLength(0);
            expect(result).toStrictEqual([]);
        });

        test('should return all To-Dos in descending order', async () => {
            const { repository } = await makeTestTodoRepository();                        
            await insertTestTodos();
            const result = await repository.findAll();
            // console.log(result); // [{ id: '4', description: 'Todo 4', createdAt: 'date 4' }, ...0]

            expect(result[0].createdAt).toBe('date 4');
            expect(result[1].createdAt).toBe('date 3');
            expect(result[2].createdAt).toBe('date 2');
            expect(result[3].createdAt).toBe('date 1');
            expect(result[4].createdAt).toBe('date 0');
        });
    });

    describe('create', () => {
        test('create a To-Do if the data is valid', async () => {
            const { repository, todos } = await makeTestTodoRepository();
            const newTodo = await repository.create(todos[0]);

            expect(newTodo).toStrictEqual({
                success: true,
                todo: todos[0]
            });
        });

        test('fails if there is a matching description in the table', async () => {
            const { repository, todos } = await makeTestTodoRepository();

            // create a new to-do
            await repository.create(todos[0]);

            // try creating another to-do with the same description
            const anotherTodo = {
                id: todos[0].id,
                description: todos[0].description,
                createdAt: 'any date'
            };

            const result = await repository.create(anotherTodo);

            expect(result).toStrictEqual({
                success: false,
                errors: ["Já existe um To-Do com ID ou descrição enviado!"]
            });
        });

        test('fails if there is an equal ID in the table', async () => {
            const { repository, todos } = await makeTestTodoRepository();

            // create a new to-do
            await repository.create(todos[0]);

            // try creating another to-do with the same ID
            const anotherTodo = {
                id: todos[0].id,
                description: 'any description',
                createdAt: 'any date'
            };

            const result = await repository.create(anotherTodo);

            expect(result).toStrictEqual({
                success: false,
                errors: ["Já existe um To-Do com ID ou descrição enviado!"]
            });
        });

        test('fails if there is an equal ID and description in the table', async () => {
            const { repository, todos } = await makeTestTodoRepository();

            // create a new to-do
            await repository.create(todos[0]);

            // try creating another to-do with the same ID
            const anotherTodo = {
                id: todos[0].id,
                description: 'any description',
                createdAt: 'any date'
            };

            const result = await repository.create(anotherTodo);

            expect(result).toStrictEqual({
                success: false,
                errors: ["Já existe um To-Do com ID ou descrição enviado!"]
            });
        });
    });

    describe('remove', () => {
        test('deletes a To-Do if it exists', async () => {
            const { repository, todos } = await makeTestTodoRepository();                        
            await insertTestTodos();
            const result = await repository.remove(todos[0].id);

            expect(result).toStrictEqual({
                success: true,
                todo: todos[0]
            });
        });

        test('fails to delete if the whole does not exist', async () => {
            const { repository } = await makeTestTodoRepository();                        
            await insertTestTodos();
            const result = await repository.remove('any id');

            expect(result).toStrictEqual({
                success: false,
                errors: ["To-Do não existe!"]
            });
        });
    });

});
