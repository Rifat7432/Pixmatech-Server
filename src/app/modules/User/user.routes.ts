/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';

const router = express.Router();

router.get('/admin', auth(USER_ROLE.admin), (req, res) => {
  res.status(200).json({ message: 'Welcome, Admin!' });
});

router.get('/user', auth(USER_ROLE.user), (req, res) => {
  res.status(200).json({ message: 'Welcome, User!' });
});

router.get(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  UserControllers.getUser,
);
router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);

export const UserRoutes = router;
