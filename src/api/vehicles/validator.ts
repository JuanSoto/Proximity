import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../common/CustomError';

export /**
 * @description
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
const validateVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { provider } = req.body;
  if (!provider || provider.length === 0) {
    ErrorHandler.handleError(req, res, {
      code: 400,
      message: 'Must provide the provider for upload the CSV file',
    });
  } else {
    next();
  }
};
