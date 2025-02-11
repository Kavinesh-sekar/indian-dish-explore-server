const express = require('express');
const route = express.Router();
const {getAllFood,getDishDetails,getSearchData,getIngredients} = require('../controller/dish.controller') 

console.log('insode route')

route.get('/list_all_dish',getAllFood)

route.get('/dish_details/:name',getDishDetails)

route.get('/dish_search/:search',getSearchData);

route.get('/ingredients',getIngredients);



module.exports = route;