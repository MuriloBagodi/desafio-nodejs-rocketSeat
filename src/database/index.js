import fs from "node:fs/promises";

const dataBasePath = new URL("db.json", import.meta.url);

export class Database {
  #databases = {};

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#databases));
  }

  constructor() {
    fs.readFile(dataBasePath, "utf-8")
      .then((data) => {
        this.#databases = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  select(table) {
    const data = this.#databases[table] ?? [];
    console.log(data)
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#databases[table])) {
      this.#databases[table].push(data)
    } else {
      this.#databases[table] = [data]
    }

    this.#persist()

    return data
  }
}
