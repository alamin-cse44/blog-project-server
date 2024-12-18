import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(BlogValidations.createBlogValidaitonSchema),
  BlogControllers.createBlog,
);

export const BlogRouters = router; 
