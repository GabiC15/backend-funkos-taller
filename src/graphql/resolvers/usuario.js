import Usuario from "./../../db/models/usuario.js";
import { getAuth } from "firebase-admin/auth";

export default {
  Query: {
    usuarios: () => Usuario.findAll(),
    usuario: (parent, args) => Usuario.findByPk(args.id),
    totalUsuarios: () =>
      Usuario.findAndCountAll().then((result) => result.count),
  },

  Mutation: {
    createUsuario: async (parent, args, { req, res }) => {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.substring(7, bearerToken.length);
      // const usuario = await Usuario.create({ ...args.input });

      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await getAuth().createSessionCookie(token, {
        expiresIn,
      });
      res.cookie("cookie", sessionCookie, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + expiresIn),
      });

      return { id: 40 };
    },
    updateUsuario: (parent, args) =>
      Usuario.update(args.input, { where: { id: args.id } }),
    deleteUsuario: (parent, args) =>
      Usuario.destroy({ where: { id: args.id } }),
  },
};
