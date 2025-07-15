export function makeNewToDo(description: string) {
    return {
        id: crypto.randomUUID(),
        description,
        createdAt: new Date().toISOString(),
    };
}