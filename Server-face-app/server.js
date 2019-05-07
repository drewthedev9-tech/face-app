const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex');

// connecting to database:
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'andrew',
      password : 'andrew',
      database : 'smartbrain'
    }
  });


//   usual format  knex.select('title', 'author', 'year').from('books')
db.select('*').from ('users').then(data =>{
    console.log(data);
});

const app = express();
// nodyParser is a middleware  
// req.body is getting things from the body of HTML and and parsing, also in JSON format.
app.use(bodyParser.json());
// cors is middle ware for connecting API to front end security.
app.use(cors());


// get request to see if front end is talking to server.
app.get('/', (req, res)=>{
    // respnding with the user database after they are updated.
    res.send(database.users)
})

//sign -- POST successful/fail.
// sign in to handle the sign inswith the database above.

app.post('/signin', (req, res)=>{
    // knes.js for selecting from the database.
   db.select('email', 'hash').from('login')
//    checks email.
   .where('email', '=', req.body.email)
    .then(data =>{
   const isValid =  bcrypt.compareSync(req.body.password,data[0].hash);
   if ( isValid){
      return db.select('*').from('users')
        .where('email', '=', req.body.email)
        .then(user =>{
            res.json(user[0])
        })
        .catch(err => res.status(400).json('unable to get user'))
        } else {
            res.status(400).json('wrong credentials')
        }
        
    })
    .catch(err=> res.status(400).json('wrong credentials'))
})

// register --> POST = user.
// registering to a new user so adding to the database.
app.post('/register', (req, res)=>{
    // using destructuring can get these thing from re.body(fron the front-end)
    const {email, name, password} = req.body;
    const hash = bcrypt.hashSync(password);
    // knex inserting from the database (users table).
    // transaction: trx
    // updates the logon table
    db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email: email,
        })
        .into('login')
        .returning('email')
        // then updates the users table.
        .then(loginemail =>{
            return trx('users')
            .returning('*')
            .insert({
                // return the array
                email: loginemail[0],
                name: name,
                joined: new Date()
            })
            .then(user =>{
            // responbding with grabbing the first in the database user(who should be the NEW user) of the array.
            res.json(user[0]);
        })
        })
        // KNEX js
        // if all the cod above passed, then will commit and run through
        .then(trx.commit)
        .catch(trx.rollback)
    })
      
    // error when people are loggin in if name is the same .
    .catch(err=> res.status(400).json('unable to register'))
})

// matching id endpoint to get user.
app.get('/profile/:id', (req, res)=>{
    // recieve user from the databse there fore needs params.
    const { id } =req.params;
  
    //knex for grabbing the profile
   db.select('*').from('users').where({id})
    .then(user=>{
        // if useres length array id not the 1st user ina rray then display
        // nof found
        if(user.length){
            res.json(user[0]);
            // 
        } else {
                res.status(400).json('not found')
        }
        })
        .catch(err => res.status(400).json('error getting user'))
    })
  
   


// increse their entries count
app.put('/image',(req, res)=>{
    const { id } =req.body;
    // KNEX update and ncrement functions
   db('users').where ('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries =>{
        res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to update entries'))
   })





app.listen (3000, ()=> {
    console.log('app is running on port 3000')
})

