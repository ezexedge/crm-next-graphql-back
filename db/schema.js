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


    type Cliente {
        id: ID
        nombre: String
        apellido : String
        empresa: String
        email:  String
        telefono: String
        vendedor: ID
    }
    type Pedido{
        id: ID
        pedido: [PedidoGrupo]
        total: Float
        cliente: ID
        vendedor: ID
        fecha: String
        estado: EstadoPedido
    }

    type PedidoGrupo{
        id: ID
        cantidad: Int
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

    input ClienteInput {
        nombre: String!
        apellido: String!
        empresa: String!
        email: String!
        telefono: String
    }

    input PedidoProductoInput {
        id: ID
        cantidad: Int
    }

    input PedidoInput{
        pedido: [PedidoProductoInput]
        total: Float!
        cliente: ID!
        estado: EstadoPedido 

    }

    enum EstadoPedido{
        PENDIENTE
        COMPLETADO
        CANCELADO
    }



    type Token{
        token : String
    }

    type Query{
        #usuarios
        obtenerUsuario(token : String!) : Usuario

        #prodcutos
        obtenerProductos: [Producto]
        obtenerProducto(id: ID!): Producto

        #clientes
        obtenerClientes: [Cliente]
        obtenerClientesVendedor: [Cliente]
        obtenerCliente(id: ID!) : Cliente

        #Pedidos
        obtenerPedidos: [Pedido]
        obtenerPedidosVendedor: [Pedido]
        obtenerPedido(id: ID!) : Pedido
    }





    type Mutation{
        #usuarios
        
        nuevoUsuario (input : UsuarioInput): Usuario
        autenticarUsuario (input : AutenticarInput): Token
        
        #productos
        nuevoProducto(input: ProductoInput): Producto
        actualizarProducto(id: ID! , input : ProductoInput): Producto
        eliminarProducto(id: ID!) : String


        #clientes 
        nuevoCliente(input : ClienteInput): Cliente
        actualizarCliente(id: ID!, input: ClienteInput): Cliente 
        eliminarCliente(id: ID!) : String

        #pedido
        nuevoPedido(input : PedidoInput): Pedido
    }

`


module.exports = typeDefs
