import { v5 as uuidv5 } from 'uuid';

export const uniqueId = () => {
  return uuidv5(Date.now().toString(), uuidv5.URL);
};
