// global
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const apiKey = ",&appid=f83f013481c764bb8e3c26c2599096da&units=metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiUrl = "http://localhost:4800";
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const error = document.getElementById("error");

// event listener to add function to existing html dom element
document.getElementById("generate").addEventListener("click", function () {

  // post data ti api
  const zipCode = document.getElementById("zip").value;
  const feelingCode = document.getElementById("feelings").value;

// post data for git zipCodeINformation
  getCodeInformation(zipCode)
    .then((teem) => {
      console.log(teem);
      if (teem) {
        const {
          main: { temp },
        } = teem;
        // post data to server and saving
        const inff = { newDate, temp, feelingCode };
        post(apiUrl + "/postData", inff);
      }
    })
    .then(() => updateUI());// update UI

});
// git zipCode information from api
async function getCodeInformation(zipCode){
  try {
    const res = await fetch(baseUrl + zipCode + apiKey);
    const teem = await res.json();
// if data true and if data false
    if (teem.cod != 200) {
// send error in HTML
      error.innerHTML = data.message;
      setTimeout((_) => (error.innerHTML = ""), 2000);
    }
    return teem;
  } catch (error) {
    console.log(error);
  }
};
// send data to server in post
const post = async (url = "", inff = {}) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(inff),
  });

  try {
    const newData = await res.json();
    console.log(`you date`, newData);
    return newData;
    // error
  } catch (error) {
    console.log(error);
  }
};
// update UI
async function updateUI(){
  // git data from server 
  const res = await fetch(apiUrl + "/getAll");
  try {
    const saveData = await res.json();
    date.innerHTML = saveData.newDate;
    temp.innerHTML = saveData.temp;
    content.innerHTML = saveData.feelingCode;
  } catch (error) {
    console.log(error);
  }
};
