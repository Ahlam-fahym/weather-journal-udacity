let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const apiKey = ",&appid=f83f013481c764bb8e3c26c2599096da&units=metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";

const apiUrl = "http://localhost:4800";
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");
const error = document.getElementById("error");
// Create a new date instance dynamically with JS

document.getElementById("generate").addEventListener("click", function () {
  const zipCode = document.getElementById("zip").value;
  const feelingCode = document.getElementById("feelings").value;

  getCodeInformation(zipCode)
    .then((teem) => {
      console.log(teem);
      if (teem) {
        const {
          main: { temp },
          name: city,
        } = teem;
        const inff = { newDate,city, temp, feelingCode };
        post(apiUrl + "/postData", inff);
      }
    })
    .then(() => updateUI());
});

async function getCodeInformation(zipCode){
  try {
    const res = await fetch(baseUrl + zipCode + apiKey);
    const teem = await res.json();

    if (teem.cod != 200) {
      error.innerHTML = data.message;
      setTimeout((_) => (error.innerHTML = ""), 2000);
    }
    return teem;
  } catch (error) {
    console.log(error);
  }
};

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
  } catch (error) {
    console.log(error);
  }
};

async function updateUI(){
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
