const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs')

const resolvers = {
    Query :  {
        obtenerCurso: () => "algo"
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

        } 
    }
}


module.exports = resolvers