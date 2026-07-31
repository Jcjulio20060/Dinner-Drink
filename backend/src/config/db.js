import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST || "127.0.0.1";
const port = process.env.MONGO_PORT || "27017";
const dbName = process.env.MONGO_DB || "admin";
const authSource = process.env.MONGO_AUTH_SOURCE || "admin";
const useAuth = process.env.MONGO_USE_AUTH === "true";

const MONGO_URI = useAuth && user && password
    ? `mongodb://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${dbName}?authSource=${authSource}`
    : `mongodb://${host}:${port}/${dbName}`;

const connectDB = async () => {
    try {
        console.log(`Iniciando conexão com banco e dados MongoDB`);
        console.log(`MongoDB URI: ${MONGO_URI}`);
        await mongoose.connect(MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Tempo limite para seleção do servidor
        });
        console.log(`✅ Conexão com MongoDB estabelecida com sucesso`);
        return true;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;