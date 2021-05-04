import express from 'express';
import jwt from 'jsonwebtoken';
import { SECRET } from './constants';

const checkId = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403)
    /* @ts-ignore */
    req['phone'] = decoded.phone;
    next();
  })  
};

export default checkId;
