import { Md5 } from 'ts-md5';
import * as bcrypt from 'bcrypt';



export const hashPassword = async (clearPwd: string, saltRounds = 10) =>
  bcrypt.hash(clearPwd, saltRounds);

export const createAvatar = (handle: string, size = '100', format = 'png') => {
  const adorable = 'https://api.adorable.io/avatars/';
  return `${adorable}${size}/${Md5.hashStr(handle)}.${format}`;
};



export const passwordFormat = {
  rule: /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/,
  message:
    'Password must contain 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long',
};

export const handleFormat = {
  rule: /[\w\-]+/,
  message: 'Handle can only contain letters, digits, underscore and dashes',
};
