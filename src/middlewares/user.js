import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";

const userMiddleware = async (req, _, next) => {
  const { session } = req.cookies || req.headers;

  if (session) {
    const decodedCookie = jwt.verify(session, process.env.JWT_SECRET);

    req.usuario = {
      id: decodedCookie.id,
      uid: decodedCookie.user_id,
      rol: decodedCookie.rol,
    };
  }

  next();
};

export default userMiddleware;
