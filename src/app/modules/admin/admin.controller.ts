import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const blockUserByIdByAdmin = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await AdminServices.blockUserByIdByAdminFromDB(
    userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User is blocked successfully',
    success: true,
    data: result,
  });
});

const deleteBlogByIdByAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.deleteBlogByIdByAdminFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog deleted successfully',
    success: true,
    data: result,
  });
});

export const AdminControllers = {
  deleteBlogByIdByAdmin,
  blockUserByIdByAdmin,
};
