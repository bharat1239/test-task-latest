import jwt from 'jsonwebtoken';
import { SECRET } from './constants';

const generateAccessToken = (phone: string) => {
  return jwt.sign({ phone }, SECRET, { expiresIn: '60s' });
}

export default generateAccessToken;
