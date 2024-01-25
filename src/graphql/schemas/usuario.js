import gql from "graphql-tag";

export default gql`
  type Usuario {
    id: Int!
    nombres: String
    apellidos: String
    direccion: String
    telefono: String
    email: String
    password: String
    fechaNacimiento: Date
    dni: String
    ciudad: Ciudad!
    rol: Rol
    carrito: Carrito
  }

  extend type Query {
    usuarios: [Usuario]
    usuario(id: Int!): Usuario
    totalUsuarios: Int
  }

  extend type Mutation {
    createUsuario(input: UsuarioInput!): Usuario
    updateUsuario(id: Int!, input: UsuarioInput!): Usuario
    deleteUsuario(id: Int!): Boolean
  }

  input UsuarioInput {
    nombres: String
    apellidos: String
    direccion: String
    telefono: String
    email: String
    password: String
    fechaNacimiento: String
    dni: String
    ciudad_id: Int
    rol_id: Int
    carrito_id: Int
  }
`;
