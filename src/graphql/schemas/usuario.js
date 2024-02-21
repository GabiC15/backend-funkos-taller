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
    authId: String
    dni: String
    ciudad: Ciudad
    rol: Rol
    carrito: Carrito
  }

  type UsuarioFb {
    uid: String!
    email: String!
    disabled: Boolean!
  }

  extend type Query {
    usuarios(rolId: Int): [Usuario]
    usuario: Usuario
    usuarioFb(uid: String!): UsuarioFb
    totalUsuarios: Int
    usuario: Usuario
    login: Usuario
  }

  extend type Mutation {
    createUsuario(input: UsuarioInput!): Usuario
    updateUsuario(input: UsuarioInput!): [Int]
    updateFbUsuario(uid: String!, input: UsuarioFbInput!): Boolean
    deleteUsuario(id: Int!): Boolean
    logout: Boolean
  }

  input UsuarioFbInput {
    disabled: Boolean
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
