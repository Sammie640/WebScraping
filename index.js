import express from "express";
import got from "got";
import cheerio from "cheerio";
import xlsx from 'xlsx';
import fs from 'fs';
import json2xls from 'json2xls';
import myJsonData from './tarladata.json' assert { type: "json" };


import jsonDataOne from './tarladata.json' assert {type:"json"};
const app = express();
const PORT = 4000;

import bodyParser from "body-parser";
import { assert } from "console";
import { type } from "os";
const urlencodedparser = bodyParser.urlencoded({extended:false});



app.set('view engine' , 'ejs');

app.get('/' , (req, res)=>{
    res.render('index' , {value:'' , title:'' , output:''});
});

app.post('/send-url' , urlencodedparser, async (req, res)=>{
    let url = req.body.myurl;
    let myIngredients = [];
    await (async ()=>{
        const response = await got(url);
        const $ = cheerio.load(response.body);

        let title = $('span[id="ctl00_cntrightpanel_lblrecipeNameH2"]').text().trim();
        let value = $('p[id="recipe_description"]').text().trim();
        let output = 'Data Transferred to buckwheat-dosa.xlsx File';
        let recipeTotalTime = $('p[style="font-size:15px;line-height:1.7em;"] time[itemprop="totalTime"]').text().trim();

        const recipe = {};

        //extracting title and description.

        recipe.title = $('span[id="ctl00_cntrightpanel_lblrecipeNameH2"]').text().trim();
        recipe.description = $('p[id="recipe_description"]').text().trim();
      

        // const result = [...$(".recipeingredients")].map(e=>({
        //     //Quantity:$(e).find('li[itemprop="ingredients"]').text().trim(),
        //     Ingredient:$(e).find('span[class="ingredient_name"]').text().trim() 
        // }))

        //extracting ingredients


        const ingredients = $('div[id="rcpinglist"] span[itemprop="recipeIngredient"]');
        recipe.ingredients = [];
        ingredients.each((index,element) =>{
            recipe.ingredients.push($(element).text().trim());
        });


        // recipe.ingredients = [...$('div[id="rcpinglist"]')].map(e=>({
        // Ingredient:$(e).find('span[itemprop="recipeIngredient"]').text().trim()
        // }))











        // const instructions = [...$(".recipeinstructions ol")].map(e=>({
        //     Instructions:$(e).find('li[itemprop="recipeInstructions"]').text().trim()
        // }))


        //extracting cooking steps
        const cookingStepsList = $('div[id="recipe_small_steps"] ol li');
        recipe.cookingSteps = [];
        cookingStepsList.each((index , element)=>{
            recipe.cookingSteps.push($(element).text().trim());
        });


        //extracting cooking and prep time

        recipe.time = [...$('p[style="font-size:15px;line-height:1.7em;"]')].map(e=>({
            prepTime:$(e).find('time[itemprop="prepTime"]').text().trim(),
            cookTime:$(e).find('time[itemprop="cookTime"]').text().trim(),
            totalTime:$(e).find('time[itemprop="totalTime"]').text().trim(),

        }))

        //extracting servings
        recipe.servings = $('span[id="ctl00_cntrightpanel_lblServes"]').text().trim();
        
        //extracting recipe Image
        recipe.recipeImage  = $('div[id="rcpimg"]').find('img').attr('src');

        const nutrition = $('table[id="rcpnutrients"] tr td');
        recipe.nutritionalValue = [];
        nutrition.each((index , element)=>{
            recipe.nutritionalValue.push($(element).text().trim());
        });


        // console.log('Name: ' , title)
        // console.log('Description: ',value);
        // console.log('Ingredients: ',result);
        // console.log('Instructions: ',instructions);
        // console.log('Time: ', time);
        // console.log('Servings: ',servings);
        // console.log('Image: ',recipeImage);

        // Logic for writing data to excels

        // const workbook = xlsx.utils.book_new();
        // const worksheet = xlsx.utils.json_to_sheet([{Title:recipe.title , Description:recipe.description , Ingredients:recipe.ingredients.toString() , CookingSteps:recipe.cookingSteps.toString() , Time:recipeTotalTime, Servings: recipe.servings, Nutrition:recipe.nutritionalValue.toString() , Image:recipe.recipeImage}])

        // xlsx.utils.book_append_sheet(workbook , worksheet , 'Bucks');
        
        // xlsx.writeFile(workbook , 'buckie.xlsx');
        // console.log(recipe);

        // const workbook = xlsx.readFile('./buckwheat-dosa.xlsx');
        // const worksheet = workbook.Sheets['buckWheatDosaSheet'];

        // const newData = [];
        // newData.push(recipe);

        // const startRow=1;
        // const startCol = 1;

        // newData.forEach((data , index)=>{
        //     const row = startRow+index;
        //     const col1 = xlsx.utils.encode_cell({r:row , c:startCol});
        //     const col2 = xlsx.utils.encode_cell({r:row , c:startCol +1});
        //     const col3 = xlsx.utils.encode_cell({r:row , c:startCol +2});
        //     const col4 = xlsx.utils.encode_cell({r:row , c:startCol +3});
        //     const col5 = xlsx.utils.encode_cell({r:row , c:startCol +4});
        //     const col6 = xlsx.utils.encode_cell({r:row , c:startCol+5});
        //     const col7 = xlsx.utils.encode_cell({r:row , c:startCol+6});
        //     const col8 = xlsx.utils.encode_cell({r:row , c:startCol +7});

        //     worksheet[col1] = {t:'s' , v:data.title};
        //     worksheet[col2] = {t:'s' , v:data.description};
        //     worksheet[col3] = {t:'a' , v:data.ingredients };
        //     worksheet[col4] = {t:'a' , v:data.cookingSteps};
        //     worksheet[col5] = {t:'a' , v:data.time};
        //     worksheet[col6] = {t:'s' , v:data.servings};
        //     worksheet[col7] = {t:'a' , v:data.nutritionalValue};
        //     worksheet[col8] = {t:'s' , v:data.recipeImage};
        // });

        // xlsx.writeFile(workbook , './buckwheat-dosa.xlsx');

        // const filename = 'buckwheat.xlsx';
         //const worksheetName = 'Buckwheat';

        //existing data in excel file
         //const workbook = xlsx.readFile("buckwheat.xlsx");
         //const worksheet = workbook.Sheets[workbook.SheetNames];
         //const existingData = xlsx.utils.sheet_to_json(worksheet);
         // const sheetNames = workbook.SheetNames;

        //new data to append to excel file

        //const newData = [{title:'new Title' ,description:'new Desc' , ingredients:['1 cup flour' , '1 spoon oil'] , cookingSteps:['add meat' , 'boil water'] , time:[{prepTime:'23 mins' , cookTime:'45 mins', totalTime:'56 mins'}], servings:'serves 5' , recipeImage:'www.google.com/cars/pagani.jpg' , nutritionalValue:['Energy', '44 cal','protein' , '3.4 g']}];
        //const newData = [];
        //newData.push(recipe);

        


        //append new data to existing data

        //const updatedData = [];
        // updatedData.push(existingData);
        // updatedData.push(newData);

       
       

        //convert the updated data to worksheet

        //const updatedWorkSheet = xlsx.utils.json_to_sheet(updatedData);


        //add updated worksheet to exisitng workbook

        //workbook.Sheets[worksheetName] = updatedWorkSheet;

        //write the updated workbook to the file

        //xlsx.writeFile(workbook , filename);

        //console.log(recipe);

        //  console.log('existing data: ',existingData);
        //  console.log('New data: ',newData);
        //  console.log('Updated Data: ',updatedData);
        //  console.log('Sheet Names: ' , sheetNames);











        //program to add JSON object to .JSON File

        // Read the existing JSON file
        const jsonData = fs.readFileSync('tarladata.json');

        // Parse the JSON data into a JavaScript object
        const data = JSON.parse(jsonData);

        // Add a new object to the array
        data.push(recipe);

        // Convert the updated data back to JSON format
        const updatedJsonData = JSON.stringify(data);

        // Write the updated data back to the file
        fs.writeFileSync('tarladata.json', updatedJsonData);














        //code to write the new .json to excel sheet
        //import jsonDataOne from './tarladata.json' assert {type:"json"};

       
        //  const xlsData = json2xls(myJsonData);

        // fs.writeFileSync('newOneMan.xlsx', xlsData, 'binary');

        //console.log(data);















        

        res.render('index', { value: value, title: title , output: output});
       

    })();
});

app.listen(PORT , ()=>{
    console.log(`Server Started , Listening to port : ${PORT}`);
});

// https://www.archanaskitchen.com/pudina-tambuli-recipe

// https://www.tarladalal.com/buckwheat-dosa-36424r

// https://www.tarladalal.com/mini-quinoa-pancakes-ibs-recipe-41520r

// https://www.tarladalal.com/oats-upma---breakfast-recipes-38987r



// const result = [...$(".list-unstyled")].map(e=>({
//     Quantity:$(e).find('li').text().trim(),
//     Ingredient:$(e).find('span[class="ingredient_name"]').text().trim()
// }))
