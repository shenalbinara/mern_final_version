import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user_route.js';

// Load environment variables from .env file
dotenv.config();


// MongoDB Connection
mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('Mongodb is connected ')

})
.catch((err) => {
    console.log(err)
});

// Initialize Express
const app = express();

  
app.listen(3000, () => {
    console.log('server is running on port 3000')
})


app.use('/api/user', userRoutes);
