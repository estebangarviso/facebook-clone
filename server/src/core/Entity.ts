import Db from '../db/index.js';
import fs, { PathOrFileDescriptor, PathLike } from 'fs';
import { USE_DB } from '@config/index';
import { uniqueId } from '@utils/index';

export default class Entity implements IEntity {
  get filePath(): PathOrFileDescriptor | PathLike | string {
    throw new Error('Method not implemented.');
  }
  get definition(): IEntityDefinition {
    throw new Error('Method not implemented.');
  }
  createdAt?: number;
  updatedAt: number | null = null;

  toJSON() {
    return {
      ...this
    };
  }

  validateBeforeAdd() {
    if (this.definition) {
      const { fields, relations } = this.definition;
      if (fields) {
        Object.keys(fields).forEach((key: string) => {
          const { required: isRequired, name, regexp, type } = fields[key];
          const value = this[key as keyof this] as any;
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
          const collection = model.getCollection();
          if (relations[key].type === 'one') {
            // @ts-ignore
            if (!this[relations[key].foreignKey])
              throw new Error(`${model.constructor.name} with ${relations[key].foreignKey} not found`);
            if (
              // @ts-ignore
              !collection.find(
                // @ts-ignore
                (item) => item[model.constructor.name.toLowerCase() + 'Id'] === this[relations[key].foreignKey]
              )
            )
              throw new Error(
                `${model.constructor.name} with ${relations[key].foreignKey} ${
                  // @ts-ignore
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
        if (!fs.existsSync(this.filePath as PathLike)) {
          fs.writeFileSync(this.filePath, '[]');
        }
        // set createdAt and updatedAt
        this.createdAt = new Date().getTime();

        const data = JSON.parse(fs.readFileSync(this.filePath as PathOrFileDescriptor, 'utf8'));
        const idVariable = this.constructor.name.toLowerCase() + 'Id';
        // @ts-ignore
        this[idVariable as keyof this] = uniqueId();

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

  async getCollection(): Promise<EntityObjType[]> {
    if (!USE_DB) return JSON.parse(fs.readFileSync(this.filePath as PathOrFileDescriptor, 'utf8'));
    else {
      try {
        const resolve = await Db.getInstance().getAllDocuments(this.constructor.name.toLowerCase());
        return resolve;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }

  async getById(id: string): Promise<EntityObjType> {
    const data = await this.getCollection();
    // @ts-ignore
    return data.find((item) => item[(this.constructor.name.toLowerCase() + 'Id') as keyof this] === id);
  }

  async updateById(id: string, data: any) {
    const collection = await this.getCollection();
    // @ts-ignore
    const index = collection.findIndex((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
    if (index === -1) {
      throw new Error(`${this.constructor.name} with id ${id} not found`);
    }
    collection[index] = {
      ...collection[index],
      ...data
    };
    fs.writeFileSync(this.filePath, JSON.stringify(collection));
  }

  async deleteById(id: string) {
    const collection = await this.getCollection();
    // @ts-ignore
    const index = collection.findIndex((item) => item[this.constructor.name.toLowerCase() + 'Id'] === id);
    if (index === -1) {
      throw new Error(`${this.constructor.name} with ${this.constructor.name.toLowerCase()}Id ${id} not found`);
    }
    collection.splice(index, 1);
    fs.writeFileSync(this.filePath, JSON.stringify(collection));
  }
}
