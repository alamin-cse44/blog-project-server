import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { blogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../user/user.interface';

const createBlogIntoDB = async (payload: IBlog) => {
  const result = await Blog.create(payload);

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query };

  // // searching
  // const blogSearchableFields = ['title', 'content'];

  // let search = '';
  // if (query?.search) {
  //   search = query.search as string;
  // }

  // const searchQuery = Blog.find({
  //   $or: blogSearchableFields.map((field) => ({
  //     [field]: { $regex: search, $options: 'i' },
  //   })),
  // });

  // // filtering
  // const exludeFields = ['search']
  // exludeFields.forEach((field) => delete queryObj[field]);
  // const filterQuery = await searchQuery.find(queryObj).populate('author');

  console.log('query: ', query);

  const blogQuery = new QeryBuilder(Blog.find().populate('author'), query)
    .search(blogSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await blogQuery.modelQuery;

  return result;
};

const getBlogByIdFromDB = async (id: string) => {
  const result = await Blog.findById(id);

  return result;
};

const updateBlogByIdIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
  user: JwtPayload,
) => {
  // check if blog exists by id
  const blog = await Blog.isBlogExistById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // check current user === blog author

  const currentUserEmail = user?.jwtPayload?.userEmail;
  const blogAuthor = await Blog.findById(id).populate<{ author: IUser }>({
    path: 'author',
    select: 'email',
  });
  const blogAuthorEmail = blogAuthor?.author?.email;

  if (currentUserEmail !== blogAuthorEmail) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to update this blog',
    );
  }

  // update the blog

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteBlogByIdFromDB = async (id: string, user: JwtPayload) => {
  // check if blog exists by id
  const blog = await Blog.isBlogExistById(id);

  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found');
  }

  // check current user === blog author

  const currentUserEmail = user?.jwtPayload?.userEmail;
  const blogAuthor = await Blog.findById(id).populate<{ author: IUser }>({
    path: 'author',
    select: 'email',
  });
  const blogAuthorEmail = blogAuthor?.author?.email;

  if (currentUserEmail !== blogAuthorEmail) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'You are not authorized to Delete this blog',
    );
  }

  // delete the blog
  const result = await Blog.findByIdAndDelete(id);

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getBlogByIdFromDB,
  deleteBlogByIdFromDB,
  updateBlogByIdIntoDB,
};
