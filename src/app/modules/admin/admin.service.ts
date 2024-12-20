import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const blockUserByIdByAdminFromDB = async (
  id: string,
  payload: Partial<IUser>,
) => {
  const user = await User.isUserExistById(id);

  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User does not exist');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogByIdByAdminFromDB = async (id: string) => {
  const blog = await Blog.isBlogExistById(id);
  

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const AdminServices = {
  deleteBlogByIdByAdminFromDB,
  blockUserByIdByAdminFromDB,
};
