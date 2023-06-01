import jwt from 'jsonwebtoken';

export const decode = (token: string, options?: jwt.DecodeOptions) => jwt.decode(token, options);
