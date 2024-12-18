import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);

  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find({});

  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const result = await Blog.findById(id);

  return result;
};

const deleteBlogByIdFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  deleteBlogByIdFromDB,
};
