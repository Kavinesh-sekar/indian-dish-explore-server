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
    
        const allDish = DishDetails;
        res.status(200).json({ 'data': allDish });
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
};

const getDishDetails  = (req,res)=>{
    try {
        let dishName = req.params.name.toLowerCase(); 
        
        let dish = dishMap.get(dishName);

       

        if (dish) {

            
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
    try{
    let searchQuery = req.params.search.toLowerCase();

    const results = UpdatedDetails.filter(dish =>
        dish.name?.toLowerCase().includes(searchQuery) ||
        dish.ingredients?.toLowerCase().includes(searchQuery) ||
        dish.state?.toLowerCase().includes(searchQuery)
    );


    return res.status(200).json(results);
}catch (err) {
    console.log('err', err);
    res.status(500).json({ message: 'Internal Server Error' });

}
};

const getIngredients = (req, res) => {
    try {
        let allIngredients = new Set();
        DishDetails.forEach(dish => {
            dish.ingredients.split(',').forEach(ingredient => {
                allIngredients.add(ingredient.toLowerCase().trim());
            });
        });

        res.status(200).json([...allIngredients]);
    } catch (err) {
        console.log('err', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


const getDishByIngredient = (req, res) => {
    try {
        

        const { selectedIngredients } = req.body;

        if (!Array.isArray(selectedIngredients) || selectedIngredients.length === 0) {
            return res.status(400).json({ message: 'Invalid input. Please provide an array of ingredients.' });
        }
        const matchedDishes = DishDetails.filter(({ ingredients }) => {
            if (!ingredients || typeof ingredients !== 'string') return false; // Safe check

            const dishIngredients = ingredients.split(',').map(ing => ing.trim().toLowerCase());
            return selectedIngredients.every(ing => dishIngredients.includes(ing.toLowerCase()));
        }).map(({ name, ingredients }) => ({ name, ingredients })); // Extract only name & ingredients



        return res.status(200).json(matchedDishes);
    } catch (error) {
        console.log('err', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    getAllFood,
    getDishDetails,
    getSearchData,
    getIngredients,
    getDishByIngredient
};

