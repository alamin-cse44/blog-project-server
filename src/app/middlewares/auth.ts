import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization?.split(' ')[0];
    let token;
    if (tokenWithBearer === 'Bearer') {
      token = req.headers.authorization?.split(' ')[1];
    } else {
      token = req.headers.authorization;
    }
    // console.log('token :', token);
    // check the token is exist
    if (!token) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'You are not Authorized!!!');
    }

    // check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            StatusCodes.UNAUTHORIZED,
            'You are not Authorized!!!',
          );
        }

        const role = (decoded as JwtPayload)?.jwtPayload?.userRole;
        // console.log(decoded);
        // console.log('role: ',role);
        // console.log('requiredRole: ' + requiredRoles);

        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            StatusCodes.FORBIDDEN,
            'You are not allowed to this action!!!',
          );
        }

        // decoded undefined
        req.user = decoded as JwtPayload;

        next();
      },
    );
  });
};

export default auth;
