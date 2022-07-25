import Db from '../db/index.js';
import fs from 'fs';
import { uniqueId } from '../utils/uuid.js';
import { USE_DB } from '../config/index.js';

export default class Entity {
  get filePath() {}
  get definition() {}
  createdAt;
  updatedAt;

  toJSON() {
    return {
      ...this
    };
  }

  validateBeforeAdd() {
    if (this.definition) {
      const { fields, relations } = this.definition;
      if (fields) {
        Object.keys(fields).forEach((key) => {
          const { required: isRequired, name, regexp, type } = fields[key];
          const value = this[key];
          // if required and value is empty throw error
          if (isRequired && !value) throw new Error(`${fields[key].name} is required`);
          // if not required and value is empty, return and don't validate
          if (!isRequired && !value) return;
          if ((!isRequired && value) || (isRequired && value)) {
            if (regexp) {
              if (type === 'file') {
                // if (!regexp.test(value.mimeType)) throw new Error(`${name} is not valid`);
                // if (value.size > 10000000) throw new Error(`${name} is too big, must be less than 10MB`); // 10MB
                // upload file
                // move file to upload folder
              } else {
                if (!regexp.test(value)) throw new Error(`${name} is not valid`);
              }
            }
          }
        });
      }
      if (relations) {
        Object.keys(relations).forEach((key) => {
          const model = relations[key].model;
          const readAll = model.readAll();
          if (relations[key].type === 'one') {
            if (!this[relations[key].foreignKey])
              throw new Error(`${model.constructor.name} with ${relations[key].foreignKey} not found`);
            if (
              !readAll.find(
                (item) => item[model.constructor.name.toLowerCase() + 'Id'] === this[relations[key].foreignKey]
              )
            )
              throw new Error(
                `${model.constructor.name} with ${relations[key].foreignKey} ${
                  this[relations[key].foreignKey]
                } not found`
              );
          }
        });
      }
    }
  }

  save() {
    try {
      this.validateBeforeAdd();
      // move files if exists
      // if file json doesn't exist create it and add empty array
      if (!USE_DB) {
        if (!fs.existsSync(this.filePath)) {
          fs.writeFileSync(this.filePath, '[]');
        }
        // set createdAt and updatedAt
        this.createdAt = new Date().getTime();
        this.updatedAt = null;

        const data = JSON.parse(fs.readFileSync(this.filePath));
        const idVariable = this.constructor.name.toLowerCase() + 'Id';
        this[idVariable] = uniqueId();

        data.push(this.toJSON());
        fs.writeFileSync(this.filePath, JSON.stringify(data));
      } else {
        return Db.getInstance().insertDocument(this.constructor.name.toLowerCase(), this.toJSON());
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async readAll() {
    if (!USE_DB) return JSON.parse(fs.readFileSync(this.filePath));
    else {
      try {
        const resolve = await Db.getInstance().getCollection(this.constructor.name.toLowerCase());
        return resolve;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  read(id) {
    const data = this.readAll();
    return data.find((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
  }

  put(id, params) {
    const data = this.readAll();
    const index = data.findIndex((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
    if (index === -1) {
      throw new Error(`${this.constructor.name} with id ${id} not found`);
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

  async getOne(query) {
    if (!USE_DB) {
      const data = this.readAll();
      return data.find((item) => {
        let isEqual = true;
        Object.keys(query).forEach((key) => {
          if (item[key] !== query[key]) isEqual = false;
        });
        return isEqual;
      });
    } else {
      try {
        const resolve = await Db.getInstance().getOne(this.constructor.name.toLowerCase(), query);
        return resolve;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  async getWithRelations(query, name) {
    if (!USE_DB) {
      const data = this.readAll();
      return data.find((item) => {
        let isEqual = true;
        Object.keys(query).forEach((key) => {
          if (item[key] !== query[key]) isEqual = false;
        });
        return isEqual;
      });
    } else {
      try {
        const resolve = await Db.getInstance().getWithRelations(
          this.constructor.name.toLowerCase(),
          this.definition.relations.query
        );
        return resolve;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }
}
