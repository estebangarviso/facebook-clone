import cryto from 'crypto';

export const encryptedString = (string) => {
  return cryto.createHash('sha256').update(string).digest('hex');
};
