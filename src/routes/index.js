import { buildRoutesPath } from "./utils/buildRoutesPath.js";
import { Database } from "../database/index.js";
import { randomUUID } from "node:crypto";

const dataBase = new Database();

export const routes = [
  {
    //Rota de boas vindas
    path: "/",
    method: "GET",
    handler: (req, res) => {
      res.send("Hello Rocket Seat");
    },
  },
  {
    //Rota na qual vai listar todas as tasks
    path: "/tasks",
    method: "GET",
    handler: (req, res) => {
      //Buscando todas as tasks
      const tasks = dataBase.select("tasks");

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    //Rota na qual vai listar todas as tasks
    path: "/tasks",
    method: "POST",
    handler: (req, res) => {
      //Craindo tasks
      console.log(req.body)
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        createdAt: new Date(),
      };

      dataBase.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
];
