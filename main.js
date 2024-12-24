// 1) წამოიღეთ მონაცემები https://dummyjson.com/users და ჩაწერეთ თქვენთან
// users.json -ში, node-fetch ის გამოყენებით

// 2) შექმენით სერვერი სადაც /users ზე როდესაც დაარექუესთებ პასუხად მივიღემ users.json ში ჩაწერილ ინფოს

// 3) დაამატეთ ფილტრები მაგალითად თუ დავწერ /users?age=30 უნდა წამოიღოს ყველა ის ტიპი ვინც 30 წლისაა.
// /users?gender=male ან /users?gender=female წამოითოს შესაბამისად ინფო ან მხოლოდ მამაკაცები ან მხოლოდ ქალბატონები.

import fetch from 'node-fetch';
import fs from 'fs/promises';
import express from 'express';

const app = express()

const fetchFunc = async () => {
  const res = await fetch("https://dummyjson.com/users");
  const data = await res.json();
  await fs.writeFile("users.json", JSON.stringify(data.users, null, 2));
};


fetchFunc()

app.get("/users",async(req,res)=>{
    const users = JSON.parse(await fs.readFile('users.json', 'utf-8'));
    let filteredUsers = users
    if(req.query.age){
        filteredUsers = filteredUsers.filter(user=>user.age === Number(req,query.age))
    }
    if(req.query.gender){
        filteredUsers = filteredUsers.filter(user=>user.gender.toLowercase() === req,query.gender.toLowercase())
    }
    res.json(filteredUsers)

})

app.listen(3000,()=>{
    console.log('running on http://localhost:3000')
})