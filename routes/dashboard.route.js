const express = require('express');
const route = express.Router();
const {getAllFood} = require('../controller/dashboard.controller') 

console.log('insode route')

route.get('/list_all_dish',getAllFood)

module.exports = route;