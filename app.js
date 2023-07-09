const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDb = require('./db/connect');
require('dotenv').config();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
 app.get('/', (req, res) => {
     res.send('Hello baby dragons');
 });

 app.use('/api/v1/tasks', tasks);

const port = parseInt(process.env.PORT);
const start = async () => {
    await connectDb(process.env.MONGO_URI);
    app.listen(port);
}

start().then(_ => console.log(`App has started successfully on port ${port}...`),
    err => console.log('Error while starting app', err));