import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BlogValidations.createBlogValidaitonSchema),
  BlogControllers.createBlog,
);

router.get('/', BlogControllers.getAllBlogs);

router.get('/:id', BlogControllers.getBlogById);

router.patch(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BlogValidations.updateBlogValidaitonSchema),
  BlogControllers.updateBlogById,
);

router.delete(
  '/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogControllers.deleteBlogById,
);

export const BlogRouters = router;
