/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TGallery } from './gallery.interface';
import { Gallery } from './gallery.model';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { JwtPayload } from 'jsonwebtoken';

const uploadImageToGalleryIntoDB = async (file: any, userData: JwtPayload) => {
  let image;
  if (file) {
    const path = file?.path;
    const imageName = file?.filename;
    // send image to cloudinary
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    image = secure_url;
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'Image not Found');
  }
  const result = await Gallery.create({ userId: userData.userId, image });
  return result
};
const getImageGalleryFromDB = async (id:string) => {
  const result = await Gallery.find({ isDeleted: false,userId:id });
  return result;
};

export const GalleryServices = {
  uploadImageToGalleryIntoDB,
  getImageGalleryFromDB,
};
