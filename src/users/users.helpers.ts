import { Md5 } from 'ts-md5';
import * as bcrypt from 'bcrypt';

export const hashPassword = async (clearPwd: string, saltRounds = 10) =>
  bcrypt.hash(clearPwd, saltRounds);

export const createAvatar = (handle: string, size = '100', format = 'png') => {
  const adorable = 'https://api.adorable.io/avatars/';
  return `${adorable}${size}/${Md5.hashStr(handle)}.${format}`;
};
