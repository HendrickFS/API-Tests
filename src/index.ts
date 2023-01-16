import express from 'express';
import cors from 'cors';

interface User{
    id: string;
    name: string;
    age: string;
}
let dbase = [{id: "1", name: "user 1", age: "20"},
            {id: "2", name: "user 2", age: "18"}];

export function searchById(db: User[], id: string){
    if(db.filter((user: User) => user.id === id).length > 0){
        return db.filter((user: User) => user.id === id);
    }else{
        throw new Error('User not found');
    }
}
export function searchByName(db: User[], name: string){
    if(db.filter((user: User) => user.name === name).length > 0){
        return db.filter((user: User) => user.name === name);
    }else{
        throw new Error('User not found');
    }
}

export function addUser(db:any, body: User){
    if((db.filter((user: User) => user.name === body.name)).length > 0){
        throw new Error('Name already exists');
    }else if((db.filter((user: User) => user.id === body.id)).length > 0){
        throw new Error('Id already exists');
    }
    else {
        db.push(body);
    }
}

export function deleteUser(db: User[],id: string){
  if (db.filter((user: User) => user.id !== id).length == db.length){
    throw new Error('User not found');
  }else{
    return db.filter((user: User) => user.id !== id);
  }
}

export function updateUser(db: User[],id: string, body: User){
        let userFound = db.find((user: User) => user.id === id);
        if (userFound === undefined) {
            throw new Error('User not found');
        } 
        userFound.name = body.name;
        userFound.age = body.age;
        return db;
}

const app = express();

app.get('/', (req, res) => {
    return res.json(dbase);
});
app.get('/search/:id', (req, res) => {
    dbase = searchById(dbase, req.params.id);
    return res.json(dbase);
});
app.get('/search/:name', (req, res) => {
    dbase = searchByName(dbase, req.params.name);
    return res.json(dbase);
});
app.post('/add', (req, res) => {
    addUser(dbase, req.body);
    return res.json(dbase);
});
app.delete('/delete/:id', (req, res) => {
    dbase = deleteUser(dbase, req.params.id);
    return res.json(dbase);
});
app.put('/update/:id', (req, res) => {
    dbase = updateUser(dbase, req.params.id, req.body);
    return res.json(dbase);
});

app.listen(21262, () => {
    console.log('Server started on port 21262');
});

export default dbase;