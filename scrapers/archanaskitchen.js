import express from "express";
import got from "got";
import cheerio from "cheerio";
import xlsx from 'xlsx';
const app = express();
const PORT = 4000;

import bodyParser from "body-parser";
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

        let title = $('h1').html();
        let value = $('p[class="lead"]').text().trim();
        let output = 'Data Transferred to pudina-tambuli.xlsx File';

        const recipe = {};

        //extracting title and description.

        recipe.title = $('h1').text().trim();
        recipe.description = $('p[class="lead"]').text().trim();
      

        // const result = [...$(".recipeingredients")].map(e=>({
        //     //Quantity:$(e).find('li[itemprop="ingredients"]').text().trim(),
        //     Ingredient:$(e).find('span[class="ingredient_name"]').text().trim() 
        // }))

        //extracting ingredients
        const ingredients = $('.recipeingredients ul li');
        recipe.ingredients = [];
        ingredients.each((index,element) =>{
            recipe.ingredients.push($(element).text().trim());
        });


        // const instructions = [...$(".recipeinstructions ol")].map(e=>({
        //     Instructions:$(e).find('li[itemprop="recipeInstructions"]').text().trim()
        // }))


        //extracting cooking steps
        const cookingStepsList = $('.recipeinstructions ol li');
        recipe.cookingSteps = [];
        cookingStepsList.each((index , element)=>{
            recipe.cookingSteps.push($(element).text().trim());
        });


        //extracting cooking and prep time

        recipe.time = [...$(".RecipeServesTime")].map(e=>({
            prepTime:$(e).find('span[itemprop="prepTime"] p').text().trim(),
            cookTime:$(e).find('span[itemprop="cookTime"] p').text().trim(),
            totalTime:$(e).find('span[itemprop="totalTime"] p').text().trim(),

        }))

        //extracting servings
        recipe.servings = $('.RecipeServesTime').find('span[itemprop="recipeYield"] p').text().trim();
        
        //extracting recipe Image
        recipe.recipeImage  = $('.recipe-image').find('img').attr('src');



        // console.log('Name: ' , title)
        // console.log('Description: ',value);
        // console.log('Ingredients: ',result);
        // console.log('Instructions: ',instructions);
        // console.log('Time: ', time);
        // console.log('Servings: ',servings);
        // console.log('Image: ',recipeImage);

        //Logic for writing data to excel

        const workbook = xlsx.utils.book_new();
        const worksheet = xlsx.utils.json_to_sheet([{Title:recipe.title , Description:recipe.description , Ingredients:recipe.ingredients.toString() , CookingSteps:recipe.cookingSteps.toString() , Time:recipe.time.find((e)=>e.totalTime), Servings: recipe.servings , Image:recipe.recipeImage}])

        xlsx.utils.book_append_sheet(workbook , worksheet , 'Pudina Tambuli');
        xlsx.writeFile(workbook , 'pudina-tambuli.xlsx');
        console.log(recipe);

        res.render('index', { value: value, title: title , output: output});
       

    })();
});

app.listen(PORT , ()=>{
    console.log(`Server Started , Listening to port : ${PORT}`);
});

// https://www.archanaskitchen.com/pudina-tambuli-recipe


// const result = [...$(".list-unstyled")].map(e=>({
//     Quantity:$(e).find('li').text().trim(),
//     Ingredient:$(e).find('span[class="ingredient_name"]').text().trim()
// }))
