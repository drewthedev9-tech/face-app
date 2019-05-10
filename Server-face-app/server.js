const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


// connecting to database:
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: 'true',
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

app.post('/signin', (req, res)=> {signin.handleSignin(req, res,db, bcrypt)})
// register --> POST = user.
// registering to a new user so adding to the database.
// register function is in teh controllers file pushing these parameters to to the 
// function.
app.post('/register', (req, res)=>{register.handleRegister(req, res,db, bcrypt)})

// matching id endpoint to get user.
app.get('/profile/:id', (req, res)=>{profile.handelProfileGet(req, res,db)})
  
   // increse their entries count
app.put('/image',(req,res)=> {image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res)=> {image.handleApiCall(req,res)})


app.listen (process.env.PORT || 3000, ()=> {
    console.log(`app is running on port ${process.env.PORT}`)
})

