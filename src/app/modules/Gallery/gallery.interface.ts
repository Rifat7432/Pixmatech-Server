/* eslint-disable no-unused-vars */

import { Types } from 'mongoose';

export interface TGallery {
  userId: Types.ObjectId;
  image: string;
  isDeleted: boolean;
}
