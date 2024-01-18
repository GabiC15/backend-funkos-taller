import Usuario from "./../../db/models/usuario.js";
import { getAuth } from "firebase-admin/auth";

export default {
  Query: {
    usuarios: () => Usuario.findAll(),
    login: async (parent, args, { req, res }) => {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.substring(7, bearerToken.length);
      const decodedToken = await getAuth().verifyIdToken(token);
      const usuario = await Usuario.findOne({
        where: { auth_id: decodedToken.uid },
      });

      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await getAuth().createSessionCookie(token, {
        expiresIn,
      });
      res.cookie("cookie", sessionCookie, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + expiresIn),
      });

      return usuario;
    },
    usuario: async (parent, args, { req, res }) => {
      const { cookie } = req.cookies;

      const decodedCookie = await getAuth().verifySessionCookie(cookie);

      const usuario = await Usuario.findOne({
        where: { auth_id: decodedCookie.uid },
      });

      return usuario;
    },
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
