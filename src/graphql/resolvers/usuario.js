import Usuario from "./../../db/models/usuario.js";
import { getAuth } from "firebase-admin/auth";

export default {
  Query: {
    usuarios: () => Usuario.findAll(),
    usuario: (parent, args) => Usuario.findByPk(args.id),
    totalUsuarios: () =>
      Usuario.findAndCountAll().then((result) => result.count),

    login: async (parent, args, { req, res }) => {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.substring(7, bearerToken.length);
      const decodedToken = await getAuth().verifyIdToken(token);
      const usuario = await Usuario.findOne({
        where: { auth_id: decodedToken.uid },
        include: "rol",
      });

      if (!usuario) return null;

      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      getAuth().setCustomUserClaims(decodedToken.uid, {
        id: usuario.id,
        rol: usuario.rol.nombre,
      });
      const sessionCookie = await getAuth().createSessionCookie(token, {
        expiresIn,
      });
      res.cookie("session", sessionCookie, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + expiresIn),
        sameSite: "none",
        domain: ".funkoplanet.online",
      });

      return usuario;
    },
    usuario: async (parent, args, { req }) => {
      const usuario = await Usuario.findOne({
        where: { id: req.usuario.id },
      });

      return usuario;
    },
  },

  Mutation: {
    createUsuario: async (parent, args, { req, res }) => {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.substring(7, bearerToken.length);
      const decodedToken = await getAuth().verifyIdToken(token);
      const usuario = await Usuario.create({
        ...args.input,
        authId: decodedToken.uid,
      });

      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      getAuth().setCustomUserClaims(decodedToken.uid, {
        id: usuario.id,
        rol: "CLIENT",
      });
      const sessionCookie = await getAuth().createSessionCookie(token, {
        expiresIn,
      });
      res.cookie("session", sessionCookie, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + expiresIn),
        sameSite: "none",
        domain: ".funkoplanet.online",
      });

      return usuario;
    },
    updateUsuario: (parent, args) =>
      Usuario.update(args.input, { where: { id: args.id } }),
    deleteUsuario: (parent, args) =>
      Usuario.destroy({ where: { id: args.id } }),
    logout: (parent, args, { res }) => {
      res.clearCookie("session");

      return true;
    },
  },
};
