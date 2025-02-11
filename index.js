const express = require('express');
const app = express();
const dotenv = require('dotenv');
const foodData = require('./utilites/foodData');
const dashboarRoute  = require('./routes/dish.route')
const cors = require('cors');
// console.log(foodData);


dotenv.config();


const port = process.env.PORT || 5000;

app.use(cors());


app.use('/api/dish',dashboarRoute);

app.use((req,res)=>{
    res.status(400).json({'message':'Invalid Route'})
})

app.listen(port,()=>{
    console.log(`server running port ${port} `)
})