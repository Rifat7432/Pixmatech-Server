import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';

import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import { USER_ROLE } from '../User/user.constant';
import { TUser } from '../User/user.interface';

const createUserIntoDB = async (userData: TUser) => {
  const isUserExist = await User.findOne({ email: userData.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'User is already exist',
    );
  }
  const result = await User.create({ ...userData, role: USER_ROLE.user });
  return result;
};
const createAdminIntoDB = async (userData: TUser) => {
  const isUserExist = await User.findOne({ email: userData.email });
  if (isUserExist) {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      'User is already exist',
    );
  }
  const result = await User.create({ ...userData, role: USER_ROLE.admin });
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }
  //checking if the password is correct

  const isPasswordCorrect = await bcrypt.compare(
    payload?.password,
    user?.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid password');
  }

  const jwtPayload = {
    email: user.email,
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  //checking if the password is correct

  const isPasswordCorrect = await bcrypt.compare(
    payload?.oldPassword,
    user?.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid password');
  }
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
    },
  );

  return null;
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  createAdminIntoDB,
  createUserIntoDB,
  loginUser,
  changePassword,
  refreshToken,
};
