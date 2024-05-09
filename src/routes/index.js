import { buildRoutesPath } from "./utils/buildRoutesPath";

export const routes = [
  {
    path: "/",
    method: "GET",
    handler: (req, res) => {
      res.send("Hello Rocket Seat");
    },
  }
];
