import { v5 as uuidv5, v4 as uuidv4 } from 'uuid';

export const uniqueId = () => {
  return uuidv5(Date.now().toString(), uuidv5.URL);
};

export const uniqueIdv4 = () => {
  return uuidv4({
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    nnamespace: '01234567-89ab-cdef-0123-456789abcdef',
    name: 'test'
  });
};
