import { getAuth } from "firebase-admin/auth";

const userMiddleware = async (req, _, next) => {
  const { session } = req.cookies;

  console.log(session);

  if (session) {
    const decodedCookie = await getAuth().verifySessionCookie(session);

    req.usuario = {
      id: decodedCookie.id,
      uid: decodedCookie.uid,
      rol: decodedCookie.rol,
    };
  }

  next();
};

export default userMiddleware;
