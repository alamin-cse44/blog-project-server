import express from 'express';
import { AdminControllers } from './admin.controller';

const router = express.Router();

router.patch('/users/:userId/block', AdminControllers.blockUserByIdByAdmin);

router.delete('/blogs/:id', AdminControllers.deleteBlogByIdByAdmin);

export const AdminRouters = router;
