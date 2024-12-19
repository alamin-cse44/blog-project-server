import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check the token is exist
    if (!token) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'You are not Authorized!!!');
    }

    // check if the token is valid
    jwt.verify(token, config.jwt_access_token as string, function(err, decoded){
        if(err){
            throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not Authorized!!!');
        }

        const role = (decoded as JwtPayload)?.data?.userRole;
        console.log("role: " + role)

        req.user = decoded as JwtPayload;
        // console.log("req.user", req.user);
        next();
    })
  });
};

export default auth;
