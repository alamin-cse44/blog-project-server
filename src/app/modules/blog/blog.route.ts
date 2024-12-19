import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidations.createBlogValidaitonSchema),
  BlogControllers.createBlog,
);

router.get('/', auth(), BlogControllers.getAllBlogs);

router.get('/:id', BlogControllers.getBlogById);

router.patch(
  '/:id',
  validateRequest(BlogValidations.updateBlogValidaitonSchema),
  BlogControllers.updateBlogById,
);

router.delete('/:id', BlogControllers.deleteBlogById);

export const BlogRouters = router;
