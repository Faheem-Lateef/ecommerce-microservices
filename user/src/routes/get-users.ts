import express, { type Request, type Response } from 'express';
import { NotFoundError } from '@thasup-dev/common';

import { User } from '../models/user';

const router = express.Router();

router.get('/api/users', async (req: Request, res: Response) => {
  const users = await User.find({});

  res.status(200).send(users);
});

export { router as getUsersRouter };
