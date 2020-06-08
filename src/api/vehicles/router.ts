import * as express from 'express';
import { validateVehicle } from './validator';
import controller from './vehicleController';

export default express
  .Router()
  .get('/', controller.list)
  .post('/uploadProviderCsv', validateVehicle, controller.uploadProviderCsv);
