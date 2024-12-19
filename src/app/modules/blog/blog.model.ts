import { model, Schema } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'Please enter a title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please enter a content'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

// check the user with the id
blogSchema.statics.isBlogExistById = async function (id: string) {
  return await Blog.findById(id);
};

export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
