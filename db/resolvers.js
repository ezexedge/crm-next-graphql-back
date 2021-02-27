const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})


const crearToken = (usuario,secreta,expiresIn) => {
    console.log(usuario)

    const {id,email,nombre,apellido} = usuario

    return jwt.sign({id},secreta,{expiresIn})
}

const resolvers = {
    Query :  {
        obtenerUsuario : async (_,{token} ) => {
            const usuarioId = await jwt.verify(token ,process.env.SECRETA)

            return usuarioId
        }
    },

    Mutation : {
        nuevoUsuario : async (_, {input}) => {
            
            const {email,password} = input

            const existeUsuario = await Usuario.findOne({email}).exec()
            console.log(existeUsuario)
            if(existeUsuario){
                throw new Error('el usuario no existe')
            }


            const salt = await bcryptjs.genSalt(10)
            input.password = await bcryptjs.hash(password , salt)

            console.log('-----hahs---',input.password)

            try{

                const usuario = new Usuario(input)

                usuario.save()

                return usuario

            }catch(error){
                console.log(error)
            }

        },
        autenticarUsuario: async (_, {input}) => {
            const {email,password} = input

            const existeUsuario = await Usuario.findOne({email}).exec()
            console.log('---user auth ----',existeUsuario)
            if(!existeUsuario){
                throw new Error('el usuario no existe')
            }

            const passwordCorrecto = await bcryptjs.compare(password,existeUsuario.password)
            if(!passwordCorrecto){
                throw new Error('el password es incorrecto')
            }


            return {
                token: crearToken(existeUsuario,process.env.SECRETA, '24h')
            }



        }
    }
}


module.exports = resolvers