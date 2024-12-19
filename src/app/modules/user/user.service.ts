import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUser, TLoginUser } from './user.interface';
import { User } from './user.model';
import jwt from 'jsonwebtoken';
import config from '../../config';

const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const loginUserIntoDB = async (payload: TLoginUser) => {
  // check if user is exist with the email address
  const user = await User.findUserByEmail(payload?.email);
  console.log('user: ', user);

  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
  }

  // check if password is correct
  const isPasswordCorrect = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The password is incorrect!!!');
  }

  // create token to send to the client

  const jwtPayload = {
    userEmail: user?.email,
    userRole: user?.role,
  };

  const accessToekn = jwt.sign(
    {
      jwtPayload,
    },
    config.jwt_access_token as string,
    { expiresIn: '10d' },
  );

  return {accessToekn};
};

const getAllUsersFromDB = async () => {
  const result = await User.find({});

  return result;
}

export const UserServices = {
  registerUserIntoDB,
  loginUserIntoDB,
  getAllUsersFromDB,
};
