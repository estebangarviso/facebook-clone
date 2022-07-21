abstract interface IEntity {
  createdAt?: number;
  updatedAt: number | null;
  get filePath(): PathOrFileDescriptor | PathLike | string;
  definition: IEntityDefinition;
  validateBeforeAdd(): void;
  toJSON(): object;
  getCollection(): Promise<EntityObjType[]>;
  getById(id: string): Promise<EntityObjType>;
  save(): Promise<void>;
  updateById(id: string, data: any): Promise<void>;
  deleteById(id: string): Promise<void>;
}

type EntityObjType = IUser | IPost | IComment;

interface IEntityDefinition {
  fields: {
    [key: string]: IFieldDefinition;
  };
  relations: {
    [key: string]: IRelationDefinition;
  };
}

interface IFieldDefinition {
  name: string;
  type: string;
  required: boolean;
  regexp?: RegExp;
  file?: boolean;
  size?: number;
  mimeType?: string;
}

interface IRelationDefinition {
  type: string;
  model: IEntity;
  foreignKey: string;
}
