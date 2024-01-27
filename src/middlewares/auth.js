import gql from "graphql-tag";
import { operationsRoles } from "../constants/operation-roles.js";

const authMiddleware = async (req, res, next) => {
  const rol = req.usuario?.rol || "CLIENT";

  const obj = gql`
    ${req.body.query}
  `;
  const queryName = obj.definitions[0].selectionSet.selections[0].name.value;
  const operationRol = operationsRoles[queryName];

  // if (!operationRol?.includes(rol)) {
  //   return res.sendStatus(401);
  // }

  next();
};

export default authMiddleware;
