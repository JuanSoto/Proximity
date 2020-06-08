import { Request, Response } from 'express';
import vehicleService from './vehicleService';
import ErrorHandler from '../../common/CustomError';

class VehicleController {
  /**
   * @swagger
   * /vehicles/:
   *   get:
   *     tags:
   *       - Vehicles
   *     description: Get all the records on DB
   *     responses:
   *       200:
   *         description: Return an array with all records on DB
   *       400:
   *         description: Returns an error
   *         schema:
   *           type: object
   *           title: error
   *           required:
   *             - error
   *             - message
   *           properties:
   *             error:
   *               type: integer
   *             message:
   *               type: string
   */
  async list(_: Request, res: Response) {
    const response = await vehicleService.list();
    res.json(response);
  }

  /**
   * @swagger
   * /vehicles/uploadProviderCsv:
   *   post:
   *     tags:
   *       - Vehicles
   *     description: Upload data for a Provider from a CSV file
   *     parameters:
   *       - name: body
   *         in: body
   *         description: name of a provider for upload a corresponding CSV file with new data
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             provider:
   *               type: string
   *               description: Provider name for upload a new CSV file
   *     responses:
   *       200:
   *        description: Returns result of process
   *       400:
   *         description: return error message
   *         schema:
   *           type: object
   *           title: result
   *           required:
   *             - message
   *           properties:
   *             message:
   *               type: string
   *       500:
   *         description: return error message
   *         schema:
   *           type: object
   *           title: result
   *           required:
   *             - message
   *           properties:
   *             message:
   *               type: string
   */
  async uploadProviderCsv(req: Request, res: Response) {
    vehicleService
      .uploadProviderCsv(req.body.provider)
      .then(r => res.status(200).json(r))
      .catch(err => ErrorHandler.handleError(req, res, err));
  }
}
export default new VehicleController();
