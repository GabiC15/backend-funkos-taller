export const hasFields = (info, search, atRoot = true) => {
  const parent = info.fieldName;
  const field = `${parent}.${
    Array.isArray(search) ? search.join(".") : search
  }`;
  const fields = resolveFields(info);

  if (atRoot) {
    return fields.includes(field);
  } else {
    for (const fieldDot of fields) {
      if (fieldDot.indexOf(field) !== -1) {
        return true;
      }
    }
  }
  return false;
};

const resolveFields = (info, deep = true, parent = []) => {
  const fieldMap = resolveFieldMap(info, deep, parent);
  return fieldMapToDot(fieldMap);
};

function fieldMapToDot(fieldMap, dots = [], parent = []) {
  for (const key of Object.keys(fieldMap)) {
    dots = [...dots, [...parent, key].join(".")];
    if (fieldMap[key]) {
      dots = fieldMapToDot(fieldMap[key], dots, [...parent, key]);
    }
  }
  return dots;
}

const resolveFieldMap = (info, deep = true, parent = []) => {
  const { fieldNodes, fragments } = info;
  const parents = Array.isArray(parent) ? [...parent] : parent.split(".");

  if (parents.length) {
    const fieldNode = getFieldNode(info, parents);
    return resolveFieldMapRecursively(
      fieldNode?.selectionSet ? [...fieldNode.selectionSet.selections] : [],
      deep,
      fragments
    );
  }

  return resolveFieldMapRecursively([...fieldNodes], deep, fragments);
};

const resolveFieldMapRecursively = (
  selectionNodes,
  deep,
  fragments,
  fieldMap = {}
) => {
  for (const selectionNode of selectionNodes) {
    if (selectionNode.kind === "Field") {
      if (deep && selectionNode.selectionSet) {
        fieldMap[selectionNode.name.value] = resolveFieldMapRecursively(
          [...selectionNode.selectionSet.selections],
          deep,
          fragments
        );
      } else {
        fieldMap[selectionNode.name.value] = {};
      }
    } else if (selectionNode.kind === "FragmentSpread") {
      const fragment = fragments[selectionNode.name.value];
      fieldMap = resolveFieldMapRecursively(
        [...fragment.selectionSet.selections],
        deep,
        fragments,
        fieldMap
      );
    } else {
      fieldMap = resolveFieldMapRecursively(
        [...selectionNode.selectionSet.selections],
        deep,
        fragments,
        fieldMap
      );
    }
  }

  return fieldMap;
};

const getFieldNode = (info, path = []) => {
  const { fieldNodes, fragments } = info;
  const fields = Array.isArray(path) ? [...path] : path.split(".");

  let selectionNodes = [...fieldNodes];
  while (selectionNodes.length) {
    const currentNodes = [...selectionNodes];
    selectionNodes = [];

    const field = fields[0];

    let found = false;
    let fragmentFound = false;
    for (const selectionNode of currentNodes) {
      if (selectionNode.kind === "Field") {
        if (selectionNode.name.value === field) {
          if (!found) {
            found = true;
            fields.shift();
          }
          if (!fields.length) {
            return selectionNode;
          }
          if (selectionNode.selectionSet) {
            selectionNodes = [
              ...selectionNodes,
              ...selectionNode.selectionSet.selections,
            ];
          }
        }
      } else if (selectionNode.kind === "FragmentSpread") {
        fragmentFound = true;
        const fragment = fragments[selectionNode.name.value];
        selectionNodes = [
          ...selectionNodes,
          ...fragment.selectionSet.selections,
        ];
      } else {
        fragmentFound = true;
        selectionNodes = [
          ...selectionNodes,
          ...selectionNode.selectionSet.selections,
        ];
      }
    }

    if (!found && !fragmentFound) {
      return;
    }
  }
};
