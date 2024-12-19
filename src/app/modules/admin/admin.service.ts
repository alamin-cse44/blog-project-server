import { Blog } from '../blog/blog.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';

const blockUserByIdByAdminFromDB = async (
  id: string,
  payload: Partial<IUser>,
) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogByIdByAdminFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const AdminServices = {
  deleteBlogByIdByAdminFromDB,
  blockUserByIdByAdminFromDB,
};
