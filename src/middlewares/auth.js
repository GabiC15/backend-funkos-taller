import gql from "graphql-tag";
import { operationsRoles } from "../constants/operation-roles.js";

const authMiddleware = async (req, res, next) => {
  const rol = req.usuario?.rol || "ALL";

  if (!req.body.query) return next();

  gql.disableFragmentWarnings();
  const obj = gql`
    ${req.body.query}
  `;
  const queryName = obj.definitions[0].selectionSet.selections[0].name.value;
  const operationRol = operationsRoles[queryName];

  if (!operationRol || queryName === "__schema") return next();
  if (operationRol && operationRol[0] === "ALL") return next();
  if (!operationRol?.includes(rol)) {
    return res.sendStatus(401);
  }

  next();
};

export default authMiddleware;
