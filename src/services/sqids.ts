import Sqids from "sqids";

export const encode = (index: number) => {
  const sqids = new Sqids();
  return sqids.encode([index]);
};
