// create object 
const { info } = app();
// add event (click ) generate 
document.getElementById("generate").addEventListener("click", info)

// create  function weather application 

function app(){

// create a new date instance dynamically 
       let d = new Date();
       let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//  // local var
// Personal API Key for OpenWeatherMap API

        const apiKey = "&appid=f83f013481c764bb8e3c26c2599096da&units=metric";
        const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
        const zipCode = document.getElementById("zip")
        const feeling = document.getElementById("feelings")

//  storage Data in function 

       function info(){
        getTemp(baseUrl, zipCode.value , apiKey)
          // create the data
        .then (data => postData({
         date : newDate,
          temp: data.main.temp,
        feelings :feeling.value,
      })
    )
    .then (() => updateUI())
  }
  // get weather temperature
  async function getTemp(baseUrl,zipCode,apiKey){
       const request = await fetch(
      `${baseUrl}${zipCode}${apiKey}`
      )

     try{ 

     const direct = await request.json();
     return direct
     } catch(error){
      console.log(error)
    }
  }

// get postData in server.js
/* Function to POST data */

 const postData = async (data ={}) =>{

   const request = await fetch('/postData',{

       method: "POST",
       headers: { "content-type": "application/json"},
       body: JSON.stringify(data),
     });

    try{ 

     const direct = await request.json();
        console.log(direct)

      } catch(error){
     console.log(error)
  }
}
/* Function to GET Web API Data*/

const updateUI = async ()=>{
  // git data from server 
   const request = await fetch("/getAll");
    try {
/* Function to GET Project Data */
     const saveData = await request.json();

     document.getElementById('date').innerHTML =  `Day    ${saveData.date}`;
     document.getElementById('temp').innerHTML =  `temperature is     ${saveData.temp}`;
     document.getElementById('content').innerHTML =  `I feel is    ${saveData.feelings}`;

      } catch (error) {
     console.log(error);
    }
  }
    return {info}
}
