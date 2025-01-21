import express from 'express';
import { createCountry, deleteCountry, getCountries, getCountryById, saveExternalCountries, updateCountry } from '../controllers/countryController';

const router = express.Router();

// Route to get and update countries data if needed
router.get('/countries', getCountries);
router.get('/countries/:id', getCountryById);
router.post('/countries', createCountry);
router.post('/countries/external', saveExternalCountries);
router.put('/countries/:id', updateCountry); 
router.delete('/countries/:id', deleteCountry);
export default router;

