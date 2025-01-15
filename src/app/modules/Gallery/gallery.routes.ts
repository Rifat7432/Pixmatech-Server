/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/sendImageToCloudinary';
import { GalleryControllers } from './gallery.controller';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/upload-image',
  auth(USER_ROLE.user, USER_ROLE.admin),
  upload.single('file'),
  GalleryControllers.uploadImageToGallery,
);
router.get(
  '/get-image/:userId',
  auth(USER_ROLE.user, USER_ROLE.admin),
  GalleryControllers.getImageGallery,
);

export const GalleryRoutes = router;
