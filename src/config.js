import {config} from 'dotenv'
config()

export const BD_HOST=process.env.BD_HOST || 'localhost'
export const BD_DATABASE= process.env.BD_DATABASE || 'proyecto2025'
export const BD_USER= process.env.BD_USER || 'root'
export const BD_PASSWORD= process.env.BD_PASSWORD || ''
export const BD_PORT= process.env.BD_PORT || 3306
export const PORT= process.env.PORT || 3000
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dxemv02vq";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "553718753892582";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "B70Rkk4ltT0X6-iKM5Z5UF6JREk";
