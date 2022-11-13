
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Global Variables */
const apiKey =',&appid=f83f013481c764bb8e3c26c2599096da=metric'
const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip='

const apiUrl ='http//localhost:4800'
const date = document.getElementById('date')
const temp= document.getElementById('temp')
const content =document.getElementById('content')
const error =document.getElementById('error')
// Create a new date instance dynamically with JS

document.getElementById('generate').addEventListener('click', function (){

    const zipCode = document.getElementById('zip').value
    const feelingCode = document.getElementById('feelings').value
   

   getCodeInformation(zipCode).then((data) => {
   if (data){ 
      const {main: {temp},
         } = data;
        const info = { newDate,temp,feelingCode,}
          postData(apiUrl +"/postData",info)

          updateUI()
          document.getElementById('entry').style.opacity=1
        }
   })
})

const getCodeInformation = async(zipCode) => {
    try{
        const res = await fetch(baseUrl + zipCode + apiKey)
        const data =await res .json()

        if (data.cod != 200){
            error.innerHTML = data.message
            setTimeout( _=>error.innerHTML='', 2000)
        }
        return data;
    }catch(error){
        console.log(error)
    }
}

const postData=async (url ="", info={}) => {
    const res  = await fetch(url ,{ 
        method :'POST',
        headers:{'content-type':'application/json'},
        body:json.stringify(info),
    })

    try{
       const newData =await res.json();
       console.log(`you date`,newData)
       return newData;
    } catch (error){
      console.log(error)
    }
 };

const updateUI= async() => {
    const res =await fetch(apiUrl + "/getAll")
    try{
        const saveData = await res.json();
        date.innerHTML=saveData.newDate;
        temp.innerHTML=saveData.temp;
        content.innerHTML=saveData.feelingCode;

    } catch (error){
console.log(error)    } 
    
}