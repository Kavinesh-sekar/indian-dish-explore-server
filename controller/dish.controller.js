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

const getNew = (req,res)=>{
    console.log('inside data');

    let filtered= 
    [
        {
          "name": "Balu shahi",
          "ingredients": "maida flour, yogurt, oil, sugar",
          "diet": "vegetarian",
          "prep_time": 45,
          "cook_time": 25,
          "flavor_profile": "sweet",
          "course": "dessert",
          "state": "west bengal",
          "region": "east"
        },
        {
          "name": "Boondi",
          "ingredients": "gram flour, ghee, sugar",
          "diet": "vegetarian",
          "prep_time": 45,
          "cook_time": 30,
          "flavor_profile": "sweet",
          "course": "dessert",
          "state": "rajasthan",
          "region": "west"
        },
        {
          "name": "Gajar ka halwa",
          "ingredients": "carrots, milk, sugar, ghee, cashews, raisins",
          "diet": "vegetarian",
          "prep_time": 40,
          "cook_time": 60,
          "flavor_profile": "sweet",
          "course": "dessert",
          "state": "punjab",
          "region": "north"
        },
        {
          "name": "Ghevar",
          "ingredients": "flour, ghee, kewra, milk, clarified butter, sugar, almonds, pistachio, saffron, green cardamom",
          "diet": "vegetarian",
          "prep_time": 15,
          "cook_time": 30,
          "flavor_profile": "sweet",
          "course": "dessert",
          "state": "rajasthan",
          "region": "west"
        }]

    // let filtered = [...DishDetails];
    

    // const data  = req.body;
    console.log('data',req.query);

    console.log('gpr',req.query.prep_time.gte);

    // let min  =req.query["prep_time[gte]"]

    // console.log('min',min);
    
    


    if(req.query.prep_time.gte){
        filtered = filtered.filter((data)=>data.prep_time>= Number(req.query.prep_time.gte))
    }
    if(req.query.prep_time.lte)
    {
        filtered = filtered.filter((data)=>data.prep_time<= Number(req.query.prep_time.lte))

    }
    console.log('fffff',filtered)
    console.log('fffff',filtered.length)
    
    return res.json('dd')
}


module.exports = {
    getAllFood,
    getDishDetails,
    getSearchData,
    getIngredients,
    getDishByIngredient,
    getNew
};

