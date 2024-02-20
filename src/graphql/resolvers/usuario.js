import emailjs from "@emailjs/nodejs";
import Usuario from "./../../db/models/usuario.js";
import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";

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
      const sessionCookie = jwt.sign(
        {
          user_id: decodedToken.uid,
          id: usuario.id,
          rol: usuario.rol.nombre,
        },
        process.env.JWT_SECRET
      );
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
      const sessionCookie = jwt.sign(
        { id: usuario.id, rol: "CLIENTE", user_id: decodedToken.uid },
        process.env.JWT_SECRET
      );

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
              to: usuario.email,
              nombre: usuario.nombres,
            },
            {
              publicKey: process.env.EMAILJS_PUBLIC_KEY,
              privateKey: process.env.EMAILJS_PRIVATE_KEY,
            }
          )
          .catch(console.log);

      return usuario.reload({ include: "rol" });
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
