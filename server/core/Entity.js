import fs from 'fs';
import { uniqueId } from '../utils/uuid.js';

export default class Entity {
  get filePath() {}
  createdAt;
  updatedAt;

  toJSON() {
    return {
      ...this
    };
  }

  validateBeforeAdd() {
    if (this.definition) {
      Object.keys(this.definition).forEach((key) => {
        if (this.definition[key].required && !this[key]) {
          throw new Error(`${this.definition[key].name} is required`);
        }
        if (this.definition[key].regexp && !this[key].match(this.definition[key].regexp)) {
          throw new Error(`${this.definition[key].name} is invalid`);
        }
      });
    }
  }

  post() {
    this.validateBeforeAdd();

    // if file json doesn't exist create it and add empty array
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]');
    }
    // set createdAt and updatedAt
    this.createdAt = new Date().getTime();
    this.updatedAt = null;

    const data = JSON.parse(fs.readFileSync(this.filePath));
    // while child class id property is equal regenerate uniqueId to avoid duplicate id in json file
    const idVariable = this.constructor.name.toLowerCase() + 'Id';
    while (data.find((item) => item[idVariable] === this[idVariable])) {
      this[idVariable] = uniqueId();
    }

    data.push(this.toJSON());
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  readAll() {
    return JSON.parse(fs.readFileSync(this.filePath));
  }

  read(id) {
    const data = this.readAll();
    return data.find((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
  }

  patch(id, params) {
    const data = this.readAll();
    const index = data.findIndex((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
    if (index === -1) {
      throw new Error(`${this.constructor.name} with ${this.constructor.name.toLowerCase()}Id ${id} not found`);
    }
    data[index] = {
      ...data[index],
      ...params
    };
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }

  delete(id) {
    const data = this.readAll();
    const index = data.findIndex((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
    if (index === -1) {
      throw new Error(`${this.constructor.name} with ${this.constructor.name.toLowerCase()}Id ${id} not found`);
    }
    data.splice(index, 1);
    fs.writeFileSync(this.filePath, JSON.stringify(data));
  }
}
