import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IUser, TLoginUser } from './user.interface';
import { User } from './user.model';

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
  
};

export const UserServices = {
  registerUserIntoDB,
  loginUserIntoDB,
};
