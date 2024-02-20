import emailjs from "@emailjs/nodejs";
import Usuario from "./../../db/models/usuario.js";
import { getAuth } from "firebase-admin/auth";

export default {
  Query: {
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
        domain: process.env.COOKIE_DOMAIN,
      });

      return usuario;
    },
    usuario: async (parent, args, { req }) => {
      const usuario = await Usuario.findOne({
        where: { id: req.usuario.id },
        include: "rol",
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
        rol: "CLIENTE",
      });
      const sessionCookie = await getAuth().createSessionCookie(token, {
        expiresIn,
      });
      res.cookie("session", sessionCookie, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + expiresIn),
        sameSite: "none",
        domain: process.env.COOKIE_DOMAIN,
      });

      if (process.env.NODE_ENV === "production")
        emailjs
          .send(
            "service_m30ktuu",
            "template_asnk3r9",
            {
              nombre: usuario.nombres,
              reply_to: usuario.email,
            },
            {
              publicKey: process.env.EMAILJS_PUBLIC_KEY,
              privateKey: process.env.EMAILJS_PRIVATE_KEY,
            }
          )
          .catch(console.log);

      return usuario.reload({ include: "rol" });
    },
    updateUsuario: (parent, args, { req }) =>
      Usuario.update(args.input, { where: { id: req.usuario.id } }),
    deleteUsuario: (parent, args) =>
      Usuario.destroy({ where: { id: args.id } }),
    logout: (parent, args, { res }) => {
      res.clearCookie("session");

      return true;
    },
  },
};
