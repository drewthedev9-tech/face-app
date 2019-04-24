const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();
// nodyParser is a middleware  
// req.body is getting things from the body of HTML and and parsing, also in JSON format.
app.use(bodyParser.json());
// cors is middle ware for connecting API to front end security.
app.use(cors());


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
            password:'bananas',
          
            // used to track scores.
            entries: 0,
            // New Date is part of javascript when date gets excecuted.
            joined: new Date()
        }

    ], login:[{
        id:'987',
        has: '',
        email : 'john@gmail.com'
    }
    ]
}

// get request to see if front end is talking to server.
app.get('/', (req, res)=>{
    // respnding with the user database after they are updated.
    res.send(database.users)
})

//sign -- POST successful/fail.
// sign in to handle the sign inswith the database above.

app.post('/signin', (req, res)=>{
   
     // Load hash from your password DB.
    bcrypt.compare("apples", '$2a$10$fL5xoeLtGxkLirnWmn.bbuGIgLnRvTfsE857LdeRcyLOfT1PIZd6.', function(err, res) {
        console.log('first guess', res)
    });
    bcrypt.compare("veggies", '$2a$10$fL5xoeLtGxkLirnWmn.bbuGIgLnRvTfsE857LdeRcyLOfT1PIZd6.', function(err, res) {
        console.log('second guess', res)
    });
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json(database.users[0]);
        } else {
            res.status(400).json('error logging in')
        }
    res.json('signing')
})

// register --> POST = user.
// registering to a new user so adding to the database.
app.post('/register', (req, res)=>{
    // using destructuring can get these thing from re.body(fron the front-end)
    const {email, name, password} = req.body;
    // pushing onto the database atray, getting them from req.body HTML.
   database.users.push({
       id:125,
       name: name,
       email: email,
       entries: 0,
       joined: new Date()
   })
    // responbding with grabbing the last user(who should be the NEW user) of the array.
    res.json(database.users[database.users.length-1])
})

// matching id endpoint to get user.
app.get('/profile/:id', (req, res)=>{
    // recieve user from the databse there fore needs params.
    const { id } =req.params;
    let found = false;
    database.users.forEach(user=>{
        //  loose equivelant ==
        // eslint-disable-next-line eqeqeq
        if (user.id == id ){
            found = true;
          return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('not found');
    }
   
})

// increse their entries count
app.put('/image',(req, res)=>{
    // recieve user id from the body in this case.
    const { id } =req.body;
    let found = false;
    database.users.forEach(user=>{
        //  loose equivelant ==
        // eslint-disable-next-line eqeqeq
        if (user.id === id ){
            found = true;
            // will increase the entries amount every picture used
            user.entries ++
          return res.json(user.entries);
        }
    })
        if(!found){
            res.status(400).json('not found');
        }
})






app.listen (3000, ()=> {
    console.log('app is running on port 3000')
})

