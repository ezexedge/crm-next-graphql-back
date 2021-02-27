const mongoose = require('mongoose')
require('dotenv').config({ 

     path: 'variables.env'

})

const conectarDB = async() => {


    try{

     await mongoose.connect( process.env.DB_MONGO ,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
     })
     console.log('db connectada')

    }catch(error){
        console.log('hubo un error ')
        console.log(error)
        process.exit(1 )
    }
}


module.exports = conectarDB

 


