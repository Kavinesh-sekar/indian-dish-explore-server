const express = require('express');
const DishDetails = require('../utilites/foodData');


const dishMap = new Map();
DishDetails.forEach(dish => dishMap.set(dish.name.toLowerCase(), dish));


let UpdatedDetails = DishDetails.map(dish => ({
    ...dish,
    name: dish.name.toLowerCase(),
    ingredients: dish.ingredients.toLowerCase(),
    state: dish.state.toLowerCase(),
}));

const getAllFood = (req, res) => {
    try {
        console.log('inside comes');
        
        const allDish = DishDetails;
        // console.log(allDish);
        res.status(200).json({ 'data': allDish });
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
};

const getDishDetails  = (req,res)=>{
    try {
        let dishName = req.params.name.toLowerCase(); 
        console.log('dddddddddddddddddddddddddddddddddd',dishName);
        
        let dish = dishMap.get(dishName);

        console.log('disg',dish);
        

        if (dish) {
            console.log('iiiiiiiiiii');
            
            res.status(200).json(dish);
        } else {
            res.status(404).json({ message: "Dish not found" });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const getSearchData = (req, res) => {
    let searchQuery = req.params.search.toLowerCase();

    const results = UpdatedDetails.filter(dish =>
        dish.name?.toLowerCase().includes(searchQuery) ||
        dish.ingredients?.toLowerCase().includes(searchQuery) ||
        dish.state?.toLowerCase().includes(searchQuery)
    );

    // Return the ENTIRE dish object, not just the name
    return res.status(200).json(results);
};

const getIngredients = (req, res) => {
    try {
        let allIngredients = new Set();
        DishDetails.forEach(dish => {
            dish.ingredients.split(',').forEach(ingredient => {
                allIngredients.add(ingredient.trim());
            });
        });

        res.status(200).json([...allIngredients]);
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = {
    getAllFood,
    getDishDetails,
    getSearchData,
    getIngredients
};

