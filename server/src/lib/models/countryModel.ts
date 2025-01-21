import mongoose, { Schema } from 'mongoose';
import { ICountry } from '../../types/country';

const countrySchema: Schema = new Schema({
  name: { type: String, required: true },
  flag: { type: String, required: true },
  population: { type: Number, required: true },
  region: { type: String, required: true },
});

const Country = mongoose.model<ICountry>('Country', countrySchema);

export default Country;
