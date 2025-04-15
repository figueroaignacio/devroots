import * as bcrypt from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const validatePassword = (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
