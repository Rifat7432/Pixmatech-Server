import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';
import config from '../config';
import path from 'path';
import { Request } from 'express';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim() },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as UploadApiResponse);
      },
    );
  });
};
export const ensureUserDirectory = (userId: string): string => {
  const userDirectory = path.join(process.cwd(), 'uploads', userId);
  if (!fs.existsSync(userDirectory)) {
    fs.mkdirSync(userDirectory, { recursive: true });
  }
  return userDirectory;
};

const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    const { userId } = req.user;
    const userDir = ensureUserDirectory(userId);
    cb(null, userDir);
  },
  filename: (req: Request, file, cb) => {
    const { email } = req.user;
    const name = email.split('@')[0];
    const uniqueName = `${name}-${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  const allowedTypes: string[] = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed.'),
    );
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

// router.post("/upload", authenticate, upload.single("file"), (req: Request, res: Response) => {
//   const userId = (req as any).userId;
//   const filePath = `/uploads/${userId}/${req.file?.filename}`;
//   res.status(200).json({ message: "File uploaded successfully.", filePath });
// });
