import gql from "graphql-tag";

export default gql`
  type Producto {
    id: Int!
    titulo: String
    descripcion: String
    precio: Float
    stock: Int
    categoria: Categoria
    caracteristica: Caracteristica
    imagenes: [ImagenProducto]
    estado: Boolean!
  }

  extend type Query {
    productos(input: ProductoQueryInput): [Producto]
    producto(id: Int!): Producto
    totalProductos: Int
  }

  extend type Mutation {
    createProducto(input: ProductoInput!): Producto
    updateProducto(id: Int!, input: ProductoInput!): Boolean
    deleteProducto(id: Int!): Boolean
  }

  input ProductoInput {
    titulo: String
    descripcion: String
    precio: Float
    stock: Int
    categoriaId: Int
    caracteristicaId: Int
    estado: Boolean
  }

  input ProductoQueryInput {
    limite: Int = 20
    pagina: Int = 1
    busqueda: String
    order: String
    precioMaximo: Float
    precioMinimo: Float
    categoriaId: Int
    subcategoriaId: Int
    caracteristicaId: Int
    estado: Boolean
  }
`;
