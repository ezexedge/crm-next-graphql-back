const Usuario = require('../models/Usuario')
const Producto  = require('../models/Producto')
const Cliente = require('../models/Cliente')
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
        },
        obtenerProductos : async () => {
            try{
                
                const productos = await Producto.find({})
                return productos

            }catch(error){
                console.log(error)
            }
        },
        obtenerProducto : async (_,{id}) => {
            const producto = await Producto.findById(id)
            if(!producto){
                throw new Error('producto no encontra')
            }

            return producto
        },
        obtenerClientes : async () => {
            try{


            const clientes = Cliente.find({})

            return clientes

            }catch(error){ 
            console.log(error)
        }
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



        },
        nuevoProducto : async (_,{input}) => {
            try{

                const producto = new Producto(input)

                const resultado = await producto.save()

                return resultado

            }catch(error){

                console.log(error)

            }
        },
        
        actualizarProducto : async (_,{id,input}) => {
            let producto = await  Producto.findById(id)
            if(!producto){
                throw new Error('producto no encontra')
            }

                producto  = await Producto.findOneAndUpdate({_id : id},input,{new : true})
            return producto
            
        },
        eliminarProducto : async (_,{id}) => {
            let producto = await  Producto.findById(id)
            if(!producto){
                throw new Error('producto no encontra')
            }

            await Producto.findByIdAndDelete({_id: id})

            return "producto eliminadom "
        },
        nuevoCliente : async (_,{input}, ctx) => {
            
         const {email} = input
         
         const cliente =  await  Cliente.findOne({ email }).exec()

         if(cliente){
            throw new Error('el cliente ya existe')
             
         }

         const nuevoCliente = new Cliente(input)
         nuevoCliente.vendedor =  ctx.usuario.id


         try{



         const resultado  =   await nuevoCliente.save()

         return resultado

            
         }catch(error){

            console.log(error)

         }

                
        }
    }
}


module.exports = resolvers