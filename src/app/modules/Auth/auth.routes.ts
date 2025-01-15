import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/user.constant';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../User/user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.createUser,
);
router.post(
  '/register-admin',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.createAdmin,
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
