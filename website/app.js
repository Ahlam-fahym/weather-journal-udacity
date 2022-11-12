
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
const apiKey =',&appid=f83f013481c764bb8e3c26c2599096da=metric'
const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip='

const apiUrl ='http//localhost:4800'



const error =document.getElementById('error')
// Create a new date instance dynamically with JS

const onGenerate = ()=>{

    const zipCode = document.getElementById('zip').value
    const feelingCode = document.getElementById('feelings').value
   

   getWeatherData(zipCode).then((data) => {
   if (data){ 
      const {
        main: {temp},
        name :city,
        weather :[{description}],
         } = data;
        const info = {
          newDate,
          city,
          temp: Math.round(temp),
          description,
          feelingCode,
          }
          postData(apiUrl +"/postData",info)

          updateUI()
          document.getElementById('entry').style.opacity=1
        }
   })
}
document.getElementById('generate').addEventListener('click',onGenerate) 

const getWeatherData = async(zipCode) => {
    try{
        const res = await fetch(baseUrl + zipCode + apiKey)
        const data =await res .json()

        if (data.cod != 200){
            error.innerHTML = data.message
            setTimeout( _=>error.innerHTML='', 2000)
            throw `${data.message}`
        }
        return data;
    }catch(error){
        console.log(error)
    }
}

const postData=async (url ="", info={}) => {
    const res  = await fetch(url ,{ 
        method :'POST',
        headers:{
            'content-type':'application/json'
        },
        body:json.stringify(info),
    })

    try{
       const newData =await res.json();
       console.log(`you just saved`,newData)
       return newData;
    } catch (error){
      console.log(error)
    }
 };

const updateUI= async() => {
    const res =await fetch(apiUrl + "/getAll")
    try{
        const savedData = await res.json();
         document.getElementById('date').innerHTML=savedData.newDate;
        document.getElementById('temp').innerHTML=savedData.temp+'&degC';
        document.getElementById('content').innerHTML=savedData.feelingCode;
        document.getElementById('city').innerHTML=savedData.city;
        document.getElementById('description').innerHTML=savedData.description;

    } catch (error){
        catchError(error)
    } 
    
}