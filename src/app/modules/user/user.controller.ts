import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const registerUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.registerUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const UserControllers = {
  registerUser,
};
