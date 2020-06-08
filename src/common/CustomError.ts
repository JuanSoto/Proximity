import { Request, Response } from 'express';

/**
 * @description
 * @export
 * @class ErrorHandler
 */
export class ErrorHandler {
  /**
   * @description
   * @param {string} errorMessage
   * @param {*} error
   * @memberof ErrorHandler
   */
  customError(errorMessage: string, error: any) {
    let errorCustom = {
      code: error.code,
      message: `${errorMessage} - ${error.message}`,
      stack: error.stack,
    };
    // Close web driver here? (Selenium)
    throw errorCustom;
  }

  /**
   * @description
   * @param {Request} req
   * @param {Response} res
   * @param {*} err
   * @param {number} [statusCode=500]
   * @memberof ErrorHandler
   */
  handleError(req: Request, res: Response, err: any, statusCode = 500): void {
    let result: any = {};

    result.err = statusCode === 400 ? 'Bad Request' : 'Internal Server Error';

    statusCode = err.code ? err.code : statusCode;
    result.err = err.message ? err.message : result.err;

    res.status(statusCode).json(result);
  }
}

export default new ErrorHandler();
