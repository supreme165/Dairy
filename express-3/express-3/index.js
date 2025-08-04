const express = require('express');
require('dotenv').config();
const { sequelize, connectDB } = require('./DB/database');
const { connect } = require('./route/userRoute');
const cors = require('cors');
const app = express();

app.use(express.json());


const PORT = process.env.PORT; 
app.get('/', (req, res) => {

res.send('Hello, World! Welcome to Express.js server.');

});
app.get('/about', (req, res) => {

    res.send('Hello, Guyies! Welcome to Hoood .');
    
    });     

// app.use('/api/user', require('./route/userRoute'));
// app.use('/api/products', require('./route/productRoute'));
app.use(cors({
    credentials: true,
    origin:['http://localhost:5173','http://localhost:5174']
}));

app.use ("/api/test",require("./route/practiceroute"));

app.use('/uploads',express.static('uploads'));

const startServer = async () => {
    await connectDB();
    await sequelize.sync({alter:false});
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
startServer();
