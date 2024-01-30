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

  type maxProductoId {
    maxId: Int!
  }


  extend type Query {
    productos(input: ProductoQueryInput): [Producto]
    producto(id: Int!): Producto
    maxProductoId: maxProductoId
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
    categoriaId: Int
  }

  input ProductoQueryInput {
    limite: Int = 20
    pagina: Int = 1
    busqueda: String
    categoriaId: Int
    subcategoriaId: Int
  }
`;
