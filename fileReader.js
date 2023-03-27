import xlsx from 'xlsx';

import ExcelJS from 'exceljs';

import fs from 'fs';
import json2xls from 'json2xls';

import Transform from 'stream';

import jsonData from './tarladata.json' assert { type: "json" };

// const filename = 'buckwheat.xlsx';
// const worksheetName = 'Buckwheat';

//existing data in excel file
// const workbook = xlsx.readFile("buckwheat.xlsx");
// const sheetNames = workbook.SheetNames;
// const worksheet = workbook.Sheets["Buckwheat"];
// const existingData = xlsx.utils.sheet_to_json(worksheet);
// console.log(existingData);
// console.log(sheetNames);




// var workbook = xlsx.readFile("buckwheat.xlsx");
// var sheet_name_list = workbook.SheetNames;

// sheet_name_list.forEach(function(y){
//     var worksheet = workbook.Sheets[y];
//     //get the complete sheet

//     var headers = {};
//     var data = [];

//     for(var z in worksheet){
//         if(z[0] === "!") continue;
//         //parse out the column row and value
//         var col = z.substring(0,1);

//         var row = parseInt(z.substring(1));

//         var value = worksheet[z].v;

//         if(row === 1){
//             headers[col] = value;
//             continue;
//         }

//         if(!data[row]) data[row] = {};
//         data[row][headers[col]] = value;
//     }

//     data.shift();
//     data.shift();
//     console.log(data);
// });


// const workbook = new ExcelJS.Workbook();

//  var workbook = xlsx.readFile("buckwheat-dosa.xlsx");
//  var sheet_name_list = workbook.SheetNames;


// workbook.xlsx.readFile('buckie.xlsx')
// .then((res)=>{
//     const worksheet = workbook.getWorksheet('Bucks');

    

//     let newObj = {
//         Title: 'dadfvdavdavsdvsvsv',
//         Description: 'fsdvdsvzsdSDcsDcsDCscsd',
//         Ingredients: [
//           'dbs',
//           'dbdf',
//           'vcvc',
//           '1yujyn',
//           'vcccv',
//           'gtrtr'
//         ],
//         CookingSteps: [
//           'vsrebvsrsrbrstbtrbgrtb'
//         ],
//         Time: [
//           { prepTime: '', cookTime: '', totalTime: '' },
//           { prepTime: '10 mins', cookTime: '10 mins', totalTime: '20 mins' }
//         ],
//         Servings: '23Makes 12 mini pancakes',
//         Nutrition: [
//             'Energy',        '40 cal',
//             'Protein',       '1.4 g',
//             'Carbohydrates', '6.5 g',
//             'Fiber',         '0.2 g',
//             'Fat',           '0.9 g',
//             'Cholesterol',   '0 mg',
//             'Sodium',        '2.7 mg'
//           ],
//         Image: 'https://cdn.tarladalal.com/members/9306/big/big_mini_quinoa_pancakes,_ibs_recipe-12742.jpg?size=696X905',
       
        
//     };

   
    

//     worksheet.addRow(newObj);
    
    


//     workbook.xlsx.writeFile('buckie.xlsx');
    
// })
// .then(()=>{
//     console.log('New Object Added to File!!!');
// })
// .catch(error=>{
//     console.log('Error occoured: ' , error);
// });
















//program to add JSON object to .JSON File

// Read the existing JSON file
//const jsonData = fs.readFileSync('tarladata.json');

// Parse the JSON data into a JavaScript object
//const data = JSON.parse(jsonData);

// Add a new object to the array
// data.push({
//   name: 'John Doe',
//   age: '25',
//   designation:'Dev Ops'
// });

// Convert the updated data back to JSON format
//const updatedJsonData = JSON.stringify(data);

// Write the updated data back to the file
//fs.writeFileSync('data.json', updatedJsonData);





//program to convert .json file to .xlsx file


// Load JSON data from file


// Convert JSON data to Excel format
//const xls = json2xls(jsonData);

// Write Excel file to disk
// fs.writeFileSync('datas.xlsx' , jsonData.toString(), (err)=>{
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('xlsx file generated successfully');
//     }
// });






import jsonDataOne from './tarladata.json' assert {type:"json"};


const xlsData = json2xls(jsonDataOne);

fs.writeFileSync('sheet1.xlsx', xlsData, 'binary');

// console.log(jsonDataOne);




























































