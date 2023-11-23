import { initializeApp } from "firebase-admin/app";
import { createRequire } from "module";
import admin from "firebase-admin";

const require = createRequire(import.meta.url);
const serviceAccount = require("./credential.json");

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default app;
