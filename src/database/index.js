import fs from "node:fs/promises";

const dataBasePath = new URL("db.json", import.meta.url);

export class Database {
  #databases = {};

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#databases, null, 2));
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

  delete(table, id){
    const rowIndex = this.#databases[table].findIndex(e=> e.id === id)

    if(rowIndex > -1){
      this.#databases[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data){
    const rowIndex = this.#databases[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      const row = this.#databases[table][rowIndex]
      this.#databases[table][rowIndex] = { id, ...row, ...data }
      this.#persist()
    }

  }
}
