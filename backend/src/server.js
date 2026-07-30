import app from './app.js';
import router from './router.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();

const isDBConnected = await connectDB();

if (isDBConnected) {
    app.use(router); // Add this line to use the router
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server is running on port ${process.env.PORT}`);
    });
}