const fs = require('fs');
const path = require('path');

const jsonFilePath = path.join(__dirname , 'indian_food.json');

let foodData = [];

try{
    const data = fs.readFileSync(jsonFilePath,'utf8')
    foodData = JSON.parse(data)
}
catch(error){
    console.log('error in reading  indian_food json file',error)
}
    

module.exports =foodData;