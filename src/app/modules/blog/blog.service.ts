import QeryBuilder from '../../builder/QeryBuilder';
import { blogSearchableFields } from './blog.constant';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

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
