/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { USER_ROLE } from './user.constant';

const getUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  if (!result || result.isDeleted !== false) {
    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'User is not found');
  }
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find({ role: USER_ROLE.user, isDeleted: false });
  return result;
};

export const UserServices = {
  getUserFromDB,
  getAllUserFromDB,
};
