export function safeAccess(object: any, keyArray: any, defaultValue: any) {
  let aux = object;
  for (const key of keyArray) {
    if (aux === null || typeof aux !== "object") {
      return defaultValue;
    }
    aux = aux[key];
  }
  if (aux === undefined || aux === null) {
    return defaultValue;
  }
  return aux;
}

export function elvisOperator(value: any, defaultValue: any) {
  return value || defaultValue;
}
