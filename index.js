const {ApolloServer} = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

const conectarDB = require('./config/db')


conectarDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : ({req}) =>{

        const token = req.headers['authorization'] || ''

        if(token){
            
            try{

                const usuario = jwt.verify(token , process.env.SECRETA)

                console.log(usuario)

                return {
                    usuario
                }

            }catch(error){

                console.log('hubo un error')
                console.log(error)

            }
            

        }
        
    }
})


server.listen().then( ({url})=>{
    console.log(`servidor url : ${url}`)

})