const handleRegister = (req, res,db, bcrypt)=>{
    // using destructuring can get these thing from re.body(fron the front-end)
    const {email, name, password} = req.body;
    // server and the client shuld do its own validation.
    if(!email  || !name || !password){
        return res.status(400).json('incorrect frm submission');
    }
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
}

module.exports ={
handleRegister: handleRegister

};