import fs from "fs";
import csvParser from "csv-parser";
import { Database } from "../../database/index.js";
import { randomUUID } from "node:crypto";

const dataBase = new Database();

async function readCSV() {
  const result = [];

  const __dirname = new URL(".", import.meta.url).pathname;

  fs.createReadStream(`${__dirname}csvTasks.csv`)
    .pipe(csvParser())
    .on("data", (data) => {
      result.push(data);
    })
    .on("end", async () => {
      console.log(result);
      for await (const task of result) {
        const taskBody = {
          title: task.title,
          description: task.description,
          id: randomUUID(),
          created_At: new Date(),
          updated_At: new Date(),
          completed_At: null,
        };
        await dataBase.insert("tasks", taskBody)
      }
      return result;
    });
}

export default readCSV();
