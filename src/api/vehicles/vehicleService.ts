import { VehicleSquema } from './vehicle.entity';
import vehicleEntity from './vehicle.entity';
import * as csvToJson from 'csvtojson';
import providerFileSetup from '../../common/providersFileSetup';
const fs = require('fs');
const lodash = require('lodash');
import ErrorHandler from '../../common/CustomError';
const s = require('shelljs');
import moment = require('moment');

/**
 * @description
 * @class VehicleService
 */
class VehicleService {
  /**
   * @description
   * @returns {Promise<any[]>}
   * @memberof VehicleService
   */
  async list(): Promise<any[]> {
    return vehicleEntity.find();
  }

  /**
   * @description
   * @param {string} provider
   * @returns {Promise<any>}
   * @memberof VehicleService
   */
  async uploadProviderCsv(provider: string): Promise<any> {
    let result = true;
    try {
      let pathFile = `${process.env.PATH_ROOT}uploads/${provider}.csv`;
      console.log('VehicleService -> pathFile', pathFile);

      if (process.env.RUNNING === 'DEV') {
        pathFile = `${process.env.PATH_ROOT}build/uploads/${provider}.csv`;
      }
      const providerConfiguration = providerFileSetup.getSetup(provider);
      const csvConverterOptions = {
        delimiter: providerConfiguration.delimiter,
        trim: true,
      };

      if (!fs.existsSync(pathFile)) {
        throw {
          code: 404,
          message: `New CSV file for provider: ${provider} was not found`,
        };
      }

      let vehiclesInfoArray = await csvToJson(csvConverterOptions).fromFile(
        pathFile
      );

      const propsArray = Object.keys(VehicleSquema);

      vehiclesInfoArray = vehiclesInfoArray.filter(vehicleCsv => {
        return vehicleCsv.VIN;
      });

      for (let vehi of vehiclesInfoArray) {
        let vehicle = new vehicleEntity();
        for (const prop of propsArray) {
          vehicle[prop] = lodash.get(vehi, prop, null);
        }
        vehicle['Create Date'] = lodash.get(vehicle, 'Create Date', new Date());

        const { VIN } = vehicle;
        const data = await vehicleEntity.findOne({ VIN });
        if (data) {
          delete vehicle.VIN;
          vehicle.__v = data.__v + 1;
        }

        Object.assign(vehicle, {
          'Update Date': new Date(),
        });

        let result = await vehicleEntity.updateOne(
          { VIN },
          { $set: vehicle },
          { upsert: true }
        );
      }

      s.cp(
        pathFile,
        `${process.env.PATH_ROOT}uploadsCompleted/${provider}-${moment().format(
          'YYYYMMDD-hh:mm:ss'
        )}.csv`
      );
      s.rm('-rf', pathFile);
    } catch (error) {
      ErrorHandler.customError('Error uploading CSV File', error);
    }
    return result;
  }
}

export default new VehicleService();
