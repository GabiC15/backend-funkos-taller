import gql from "graphql-tag";

export default gql`
  type ImagenProducto {
    id: Int!
    path: String
    producto: Producto
  }

  extend type Query {
    imagenesProducto: [ImagenProducto]
    imagenProducto(id: Int!): ImagenProducto
  }

  extend type Mutation {
    createImagenProducto(input: ImagenProductoInput!): ImagenProducto
    updateImagenProducto(id: Int!, input: ImagenProductoInput!): ImagenProducto
    updateImagenProductoByPath(productoId: Int!, path: String!, input: ImagenProductoUpdateInput!): Boolean
    deleteImagenProducto(id: Int!): Boolean
  }

  input ImagenProductoInput {
    path: String
    producto_id: Int
  }

  input ImagenProductoUpdateInput {
    path: String
  }

`;
