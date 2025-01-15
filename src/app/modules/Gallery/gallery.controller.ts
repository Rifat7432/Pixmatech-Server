import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { GalleryServices } from './gallery.service';

const uploadImageToGallery = catchAsync(async (req, res) => {
  const result = await GalleryServices.uploadImageToGalleryIntoDB(req.file,req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image uploaded into gallery successfully',
    data: result,
  });
});
const getImageGallery = catchAsync(async (req, res) => {
  const result = await GalleryServices.getImageGalleryFromDB(req.params.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Image found successfully',
    data: result,
  });
});

export const GalleryControllers = {
  uploadImageToGallery,
  getImageGallery,
};
