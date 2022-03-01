export const pick = <T>(object: T, keys: (keyof T)[]) => {
  return keys.reduce((obj: T, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as T);
};
export const omit = <T>(object: T, keys: (keyof T)[]) => {
  return keys.reduce((obj: T, key) => {
    if (obj && Object.prototype.hasOwnProperty.call(object, key)) {
      delete obj[key];
    }
    return obj;
  }, JSON.parse(JSON.stringify(object)) as T);
};
