const express = require('express');
const route = express.Router();
const {getAllFood,getDishDetails,getSearchData,getIngredients,getDishByIngredient,getNew} = require('../controller/dish.controller') 



route.get('/list_all_dish',getAllFood)

route.get('/dish_details/:name',getDishDetails)

route.get('/dish_search/:search',getSearchData);

route.get('/ingredients',getIngredients);

route.post('/search-by-ingredients',getDishByIngredient);

route.get('/test',getNew);




module.exports = route;