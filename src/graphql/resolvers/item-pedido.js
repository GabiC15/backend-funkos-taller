import ItemPedido from "./../../db/models/item_pedido.js";
import Producto from "./../../db/models/producto.js";

export default {
  Query: {
    itemPedidos: () => ItemPedido.findAll(),
    itemPedido: (parent, args) =>
      ItemPedido.findByPk(args.id, { include: "producto" }),
    itemsMasPedidos: async () => {
      const items = await ItemPedido.findAll({
        include: [
          {
            model: Producto,
            as: "producto",
            attributes: ["titulo"],
          },
        ],
      });

      const itemsCount = items.reduce((acc, item) => {
        const productoId = item.dataValues.producto_id;
        const titulo = item.dataValues.producto.titulo;

        if (!acc[productoId]) {
          acc[productoId] = { productoId, productoTitulo: titulo, cantidad: 0 };
        }
        acc[productoId].cantidad += item.cantidad;
        return acc;
      }, {});

      return Object.entries(itemsCount)
        .sort((a, b) => a[1].cantidad - b[1].cantidad)
        .map(([productoId, { productoTitulo, cantidad }]) => ({
          productoId,
          productoTitulo,
          cantidad,
        }))
        .slice(-5);
    },
    volumenItemsPedidos: async () => {
      const items = await ItemPedido.findAll({
        include: [
          {
            model: Producto,
            as: "producto",
            attributes: ["titulo"],
          },
        ],
      });

      let cantidadTotal = 0;
  
      const itemsCount = items.reduce((acc, item) => {
        const productoId = item.dataValues.producto_id;
        const titulo = item.dataValues.producto.titulo;
        cantidadTotal += item.dataValues.cantidad;

        if (!acc[productoId]) {
          acc[productoId] = { productoId, productoTitulo: titulo, cantidadItem: 0 };
        }
        acc[productoId].cantidadItem += item.cantidad;
        
        return acc;
      }, {});
  
      return Object.entries(itemsCount)
        .sort((a, b) => b[1].cantidadItem - a[1].cantidadItem)
        .map(([productoId, { productoTitulo, cantidadItem }]) => ({
          productoId,
          productoTitulo,
          cantidadItem,
          cantidadTotal,
        }));
    },
  },


  
  Mutation: {
    createItemPedido: (parent, args) => ItemPedido.create(args.input),
    updateItemPedido: async (parent, args) => {
      const itemPedido = await ItemPedido.update(args.input, {
        where: { id: args.id },
        returning: true,
      });
      return itemPedido[1][0];
    },
    deleteItemPedido: (parent, args) =>
      ItemPedido.destroy({ where: { id: args.id } }),
  },
};
