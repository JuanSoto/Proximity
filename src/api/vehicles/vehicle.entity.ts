import * as Mongoose from 'mongoose';

export interface IVehicle extends Mongoose.Document {
  UUID: String;
  VIN: String;
  Make: String;
  Model: String;
  Mileage: Number;
  Year: String;
  Price: Number;
  'Zip Code': String;
  'Create Date': Date;
  'Update Date': Date;
}

const VehicleSchema: Mongoose.Schema = new Mongoose.Schema({
  UUID: { type: String, required: false },
  VIN: { type: String, required: true },
  Make: { type: String, required: false },
  Model: { type: String, required: false },
  Mileage: { type: Number, required: false },
  Year: { type: String, required: false },
  Price: { type: Number, required: false },
  'Zip Code': { type: String, required: false },
  'Create Date': { type: Date, required: false },
  'Update Date': { type: Date, required: false },
  __v: { type: Number, required: false },
});

export const VehicleSquema = {
  UUID: '',
  VIN: '',
  Make: '',
  Model: '',
  Mileage: 0,
  Year: '',
  Price: 0,
  'Zip Code': '',
  'Create Date': new Date(),
  'Update Date': new Date(),
};

export default Mongoose.model<IVehicle>('Vehicles', VehicleSchema);
