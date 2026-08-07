import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    baseUrl: process.env.BASE_URL || ''
};