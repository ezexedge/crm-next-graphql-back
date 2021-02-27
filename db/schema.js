const { gql } = require('apollo-server')

const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        creado: String
    }


    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        creado: String
    }

    input AutenticarInput{
        email: String!
        password: String!
    }

    input UsuarioInput{
        nombre : String!
        apellido: String!
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre : String!
        existencia: Int!
        precio: Float!
    }



    type Token{
        token : String
    }

    type Query{
        obtenerUsuario(token : String!) : Usuario
    }



    type Mutation{
        #usuarios
        
        nuevoUsuario (input : UsuarioInput): Usuario
        autenticarUsuario (input : AutenticarInput): Token
        
        #productos
        nuevoProducto(input: ProductoInput): Producto
    }

`


module.exports = typeDefs
