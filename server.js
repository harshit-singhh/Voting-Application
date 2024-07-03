const express = require('express');
const app = express();
const dotenv = require('dotenv');
const colors = require('colors');
const bodyParser = require('body-parser');
dotenv.config();
const { notFound, errorHandler } = require('./middleware/GlobalErrorHandlers');
const connectDB = require('./db');
const userRoutes = require('./routes/userRoutes');






PORT = process.env.PORT;
connectDB();


app.use(bodyParser.json());



app.use('/user', userRoutes);




app.use(notFound);
app.use(errorHandler);

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`.yellow.underline);
})
