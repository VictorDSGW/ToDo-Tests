import * as sanitizeStrMod from "@/utils/sanitize-str";
import { makeValidatedTodo } from "./make-validated-todo";

describe('makeValidatedTodo (unit)', () => {
    test('Should call sanitizeStr function with correct value', () => {
        // Mockar (Mock) -> Subistituir alguma coisa temporariamente
        // spyOn -> Interceptar e verificar
        // Arrange
        const description = 'abcd'
        const sanitizeStrSpy = vi
        .spyOn(sanitizeStrMod, 'sanitizeStr')
        .mockReturnValue(description);

        // Act
        makeValidatedTodo(description);
        
        // Assert
        expect(sanitizeStrSpy).toHaveBeenCalledExactlyOnceWith(description);
        expect(sanitizeStrSpy).toHaveBeenCalledTimes(1);
        expect(sanitizeStrSpy).toHaveBeenCalledWith(description);
    });
    
    test('Should call validateTodoDescription with return sanitizeStr', () => {});
    
    test('Should call makeNewTodo if validateTodoDescription return success', () => {});
    
    test('Should call return validate TodoDescription.error if validation fails', () => {});
});