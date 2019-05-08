const handleProfileGet =(req, res, db)=>{
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
    }

    module.exports = {
        handleProfileGet: handleProfileGet
    }