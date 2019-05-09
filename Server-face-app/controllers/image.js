const Clarifai = require('clarifai');

// API
const app = new Clarifai.App({
    apiKey: '5f569590514d49e99b9ac44c33093a3c'
   });


const handleApiCall = (req, res) => {
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err=> res.status(400).json('unable to work with API'))
}


const handleImage =(req, res, db)=>{
    const { id } =req.body;
    // KNEX update and ncrement functions
   db('users').where ('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries =>{
        res.json(entries[0]);
   })
   .catch(err => res.status(400).json('unable to update entries'))
   
   }

   module.exports={
    handleImage : handleImage,
    handleApiCall: handleApiCall

   }