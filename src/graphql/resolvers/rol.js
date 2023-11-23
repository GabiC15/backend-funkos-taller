import Rol from "./../../db/models/rol.js";

export default {
  Query: {
    roles: () => Rol.findAll(),
    rol: (parent, args) => Rol.findByPk(args.id),
  },
};
