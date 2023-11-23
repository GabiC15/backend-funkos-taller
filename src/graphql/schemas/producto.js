import gql from "graphql-tag";

export default gql`
  type Producto {
    id: Int!
    titulo: String
    descripcion: String
    precio: Float
    stock: Int
    categoria: Categoria
    imagenes: [ImagenProducto]
  }

  extend type Query {
    productos: [Producto]
    producto(id: Int!): Producto
  }

  extend type Mutation {
    createProducto(input: ProductoInput!): Producto
    updateProducto(id: Int!, input: ProductoInput!): Producto
    deleteProducto(id: Int!): Boolean
  }

  input ProductoInput {
    titulo: String
    descripcion: String
    precio: Float
    stock: Int
    categoria_id: Int
  }
`;
