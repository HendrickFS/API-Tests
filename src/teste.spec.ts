import {expect, jest, test} from '@jest/globals';
import {deleteUser, addUser, updateUser, searchById, searchByName} from './index';
interface User{
        id: string;
        name: string;
        age: string;
}

describe('Teste geral', () => {
    let db = [{id: "1", name: "user 1", age: "20"},
            {id: "2", name: "user 2", age: "18"}];
    
    test('Get users', () => {
        expect(db).toEqual([{id: "1", name: "user 1", age: "20"},
                            {id: "2", name: "user 2", age: "18"}]);
    });
    test('Create users', () => {
        addUser(db, {id: "3", name: "user 3", age: "18"});
        expect(db).toHaveLength(3);
    });
    test('Delete users', () => {
        db = deleteUser(db, "1");
        expect(db).toHaveLength(2);
    });
    test('Update users', () => {
        db = updateUser(db, "3", {id: "3", name: "user 3 again", age: "18"});
        expect(db).toEqual([{id: "2", name: "user 2", age: "18"},
                            {id: "3", name: "user 3 again", age: "18"}]);
    });
});

describe('User search use cases', () => {
    let db = [{id: "1", name: "user 1", age: "20"},
                {id: "2", name: "user 2", age: "18"}];
    test('Id not found', () => {
        expect(() => searchById(db, "3")).toThrowError('User not found');
    });
    test('Name not found', () => {
        expect(() => searchByName(db, "user 3")).toThrowError('User not found');
    });
});

describe('User create use cases', () => {
    let db = [{id: "1", name: "user 1", age: "20"},
                {id: "2", name: "user 2", age: "18"}];
    test('Name already exists', () => {
        expect( () => addUser(db, {id: "3", name: "user 1", age: "18"})).toThrowError('Name already exists');
    });
    test('Id already exists', () => {
        expect(() => addUser(db, {id: "1", name: "user 3", age: "18"})).toThrowError('Id already exists');
    });
});

describe('User delete use cases', () => {
    let db = [{id: "1", name: "user 1", age: "20"},
                {id: "2", name: "user 2", age: "18"}];
    test('User not found', () => {
        expect(() => deleteUser(db, "3")).toThrow();
        ;
    });
});

describe('User update use cases', () => {
    let db = [{id: "1", name: "user 1", age: "20"},
                {id: "2", name: "user 2", age: "18"}];
    test('User not found', () => {
        expect(() => updateUser(db, "3",{id: "3", name: "user 1", age: "20"})).toThrowError('User not found');
    });
    test('Should update user name', () => {
        db = updateUser(db, "1",{id: "1", name: "user 1 again", age: "20"});
        expect(db).toEqual([{id: "1", name: "user 1 again", age: "20"},
                            {id: "2", name: "user 2", age: "18"}]);
    });
    test('Should update user age', () => {
        db = updateUser(db, "1",{id: "1", name: "user 1 again", age: "32"});
        expect(db).toEqual([{id: "1", name: "user 1 again", age: "32"},
                            {id: "2", name: "user 2", age: "18"}]);
    });
});