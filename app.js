const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDb = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./public'));

// routes
 app.use('/api/v1/tasks', tasks);
 app.use(notFound); // custom generic 404 response
 app.use(errorHandler); // custom error handler

const port = parseInt(process.env.PORT);
const start = async () => {
    await connectDb(process.env.MONGO_URI);
    app.listen(port);
}

start().then(_ => console.log(`App has started successfully on port ${port}...`),
    err => console.log('Error while starting app', err));