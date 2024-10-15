import { setULogger } from "u-logger";

setULogger(
  true,
  (name, args) => console.log([name, JSON.stringify(args)].join(" :: ")),
  (name, args) => console.log([name, JSON.stringify(args)].join(" :: ")),
  (name, args) => console.log([name, JSON.stringify(args)].join(" :: "))
);
