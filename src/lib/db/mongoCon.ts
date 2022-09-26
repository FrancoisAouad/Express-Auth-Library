import mongoose from 'mongoose';

mongoose
    .connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, {
        dbName: process.env.DB_NAME,
    })
    .then(() => {
        console.log('Connected to MongoDB'.green.bold);
    })
    .catch((err) => console.log(err.message));

mongoose.connection.on('connected', () => {
    console.log('Mongoose connection is UP.'.green.bold);
});

mongoose.connection.on('error', (err) => {
    console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is DOWN.'.green.bold);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});
