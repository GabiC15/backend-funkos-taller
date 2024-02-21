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
        limit: 25,
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

    // volumenItemsPedidos: async () => {
    //   // Retrieve all items with their associated product titles
    //   const items = await ItemPedido.findAll({
    //     include: [
    //       {
    //         model: Producto,
    //         as: "producto",
    //         attributes: ["titulo"],
    //       },
    //     ],
    //   });
    
    //   // Calculate the total quantity for each product
    //   const itemsCount = items.reduce((acc, item) => {
    //     const { producto_id, producto: { titulo }, cantidad } = item.dataValues;
    //     acc[producto_id] = acc[producto_id] || { productoId: producto_id, productoTitulo: titulo, cantidadItem: 0 };
    //     acc[producto_id].cantidadItem += cantidad;
    //     return acc;
    //   }, {});
    
    //   // Sort the items by their total quantity and format the output
    //   const sortedItems = Object.values(itemsCount)
    //     .sort((a, b) => b.cantidadItem - a.cantidadItem)
    //     .map(({ productoId, productoTitulo, cantidadItem }) => ({ productoId, productoTitulo, cantidadItem }));
    
    //   // Calculate the total quantity of all items
    //   const cantidadTotal = Object.values(itemsCount).reduce((total, { cantidadItem }) => total + cantidadItem, 0);
    
    //   // Add the total quantity to each product and return the sorted items
    //   return sortedItems.map(item => ({ ...item, cantidadTotal }));
    // }
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
