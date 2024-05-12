import { buildRoutesPath } from "./utils/buildRoutesPath.js";
import { Database } from "../database/index.js";
import { randomUUID } from "node:crypto";

const dataBase = new Database();

export const routes = [
  {
    //Rota na qual vai listar todas as tasks
    path: buildRoutesPath("/tasks"),
    method: "GET",
    handler: (req, res) => {
      console.log("Buscando tasks");
      //Buscando todas as tasks
      const tasks = dataBase.select("tasks");

      return res.writeHead(200).end(JSON.stringify(tasks));
    },
  },
  {
    //Rota na qual vai listar todas as tasks
    path: buildRoutesPath("/tasks"),
    method: "POST",
    handler: (req, res) => {
      //Craindo tasks
      console.log(req.body);
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ error: "Title is empty, please fill it" }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ error: "Description is empty, please fill it" })
          );
      }

      const task = {
        id: randomUUID(),
        title,
        description,
        created_At: new Date(),
        updated_At: new Date(),
        completed_At: null,
      };

      dataBase.insert("tasks", task);

      return res.writeHead(201).end();
    },
  },
  {
    //Rota na qual vai listar todas as tasks
    path: buildRoutesPath("/tasks/:id"),
    method: "PUT",
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      dataBase.update("tasks", id, {
        title: title,
        description: description,
        updated_At: new Date(),
      });

      return res.writeHead(204).end();
    },
  },
  {
    //Rota na qual vai DELETAR uma task especifica
    path: buildRoutesPath("/tasks/:id"),
    method: "DELETE",
    handler: (req, res) => {
      //DELETANDO task
      dataBase.delete("tasks", req.params.id);

      return res.writeHead(204).end();
    },
  },
  {
    //Rota na qual vai COMPLETAR uma task especifica
    path: buildRoutesPath("/tasks/:id/complete"),
    method: "PATCH",
    handler: (req, res) => {
      const { id } = req.params;
      const [task] = dataBase.select("tasks", id);
      const completed_At = new Date();
      //Completa a task selecionada
      dataBase.update("tasks", id, { completed_At });

      res.writeHead(204).end()
    },
  },
];
