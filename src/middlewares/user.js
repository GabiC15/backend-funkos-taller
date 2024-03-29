import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";

const userMiddleware = async (req, res, next) => {
  const { session } = req.cookies;

  if (session) {
    try {
      const decodedCookie = jwt.verify(session, process.env.JWT_SECRET);

      req.usuario = {
        id: decodedCookie.id,
        uid: decodedCookie.user_id,
        rol: decodedCookie.rol,
      };
    } catch (e) {
      return res.sendStatus(401);
    }
  }

  next();
};

export default userMiddleware;
