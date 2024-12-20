import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IBlog {
  title: string;
  content: string;
  author: Types.ObjectId | IUser;
  isPublished: boolean;
}



export interface BlogModel extends Model<IBlog> {
  isBlogExistById(id: string): Promise<IBlog>;
}
