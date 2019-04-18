const express = require('express');
const bodyParser = require('body-parser');


const app = express();
// nodyParser is a middleware  
app.use(bodyParser.json());


// temporary database
const database = {
    users: [
        {
            id: 123,
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            // used to track scores.
            entries: 0,
            // New Date is part of javascript when date gets excecuted.
            joined: new Date()
        },

        {
            id: 124,
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            // used to track scores.
            entries: 0,
            // New Date is part of javascript when date gets excecuted.
            joined: new Date()
        }

    ]
}

// get request to see if front end is talking to server.
app.get('/', (req, res)=>{
    res.send('this is working ')
})

//sign -- POST successful/fail.
// sign in to handle the sign inswith the database above.

app.post('/signin', (req, res)=>{
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json('success');
        } else {
            res.status(400).json('error logging in')
        }
    res.json('signing')
})

// register --> POST = user.



app.listen (3000, ()=> {
    console.log('app is running on port 3000')
})

/* 

/-- res = this is working



register --> POST = user

/profile/ :userID --> = user

/

*/