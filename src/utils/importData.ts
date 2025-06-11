import csv from 'csvtojson';
import Property from '../models/property.model';
import {connectDB} from '../config/database';
import dotenv from 'dotenv';

dotenv.config();

const parseBoolean = (value: string): boolean => {
  return value.toLowerCase() === 'true' || value.toLowerCase() === 'furnished';
};

const importData = async (filePath: string) => {
  try {
    await connectDB();
    const jsonArray = await csv().fromFile(filePath);

    // Map/Transform data to fix booleans
    const transformedData = jsonArray.map((item) => ({
      ...item,
      furnished: parseBoolean(item.furnished),
      isVerified: parseBoolean(item.isVerified),
    }));

    await Property.insertMany(transformedData);
    console.log('✅ CSV Data Imported Successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

const filePath = process.argv[2];
if (!filePath) {
  console.error('❗ Please provide path to CSV file.');
  process.exit(1);
}

importData(filePath);
