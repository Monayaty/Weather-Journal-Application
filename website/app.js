/* Global Variables */

//declare our url
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

//declare our Key from openweathermap.org
const apiKEY = ",us&units=metric&appid=";

//our Global variables we will use
const zip = document.getElementById('zip');
const feel = document.getElementById('feelings');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//Creating Error function
const catchingErrors = (error) => console.log('We have found Error here: ',error);

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

//Adding a click event listener
let myBtn = document.getElementById('generate');//declate btn variable
myBtn.addEventListener('click', whenClick);//Adding click event to perform action when click 

//posting our data to api
function whenClick(e){
    //declare variables for input values
    let zipCode = zip.value;
    let feels = feel.value;

    if(zipCode.length == 0){
        alert("Please Enter your zipcode");
    }
    else if(feels.length == 0){
        alert("Please Enter your Feeling");
    }
    else{
    myWeatherTemp(apiURL,zipCode,apiKEY)//calling my get data function
    .then(function(data){
        postData('/addData', 
        {
            date:newDate,
            temp:data.main.temp,
            feel:feels
        });
    })
    .then(function()
    {
        updateUI();//Updating UI with new Data
    })
    }
};

//using function to get web api 
const myWeatherTemp = async (apiURL,zipCode,apiKEY) => 
{
    const res = await fetch(apiURL+zipCode+apiKEY);//Fetching Url together to get data
    try
    {
        let data = await res.json();//transform data to json type
        console.log(data);
        return data;
    }
    catch(error){
        catchingErrors();//Handeling Errors
    }
};

//Async POST
const postData = async ( url = '', data = {}) =>
{
    const res = await fetch(url, 
        {
    method: 'POST', 
    credentials: 'same-origin', 
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify(data), 
        });
    try 
    {
      const newData = await res.json();
      return newData;
    }
    catch(error) 
    {
        catchingErrors(error);//Handeling Errors
    }
};

//Async GET
const retrieveData = async (url='') =>{ 
  const req = await fetch(url);//Fetching
  try 
  {
  //Transform into JSON
  const allData = await req.json();
  }
  catch(error) 
  {
    catchingErrors(error);//Handeling Errors
  }
};
//Updating UI with new data
const updateUI = async() => {
    const req = await fetch('/allData');//Fetching
    try{
        const allData = await req.json()
        .then(data =>{
            console.log(data);
            date.innerHTML = `Today is: ${data.date}`;//Adding date to UI
            temp.innerHTML = `Temperatuer is: ${data.temp}`;//Adding Temprature to UI
            content.innerHTML = `I'm feeling that I'm ${data.feel}`;//Adding User feelings to UI
        })
    }
    catch(error)
    {
        catchingErrors(error);//Handeling Errors
    }
}