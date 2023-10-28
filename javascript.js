const APIKEY = "3376feab2b164e34939f85c32b18ee05";
const cityInput = document.getElementById("city_input");
const formEl = document.querySelector("form");
const weatherAppEl = document.getElementById("weatherApp");
const detailsEl = document.getElementById("details")


async function getData(input){
try {
const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${APIKEY}&units=metric`)
    if(!response.ok){
    throw error("error", error)
    } 

const data = await response.json()
const name = data.name
const country = data.sys.country
const dt = data.dt
const icon = data.weather[0].icon
const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
const timezone = data.timezone

console.log(JSON.stringify(data))

weatherAppEl.querySelector(".day").innerHTML = converter(dt)
weatherAppEl.querySelector(".location").innerHTML = name+' '+country
weatherAppEl.querySelector(".icon").innerHTML = 
`<img src="${iconUrl}" alt="icon">`;
weatherAppEl.querySelector(".temp").textContent = Math.round(data.main.temp)+"°C"
weatherAppEl.querySelector(".description").textContent = data.weather[0].description
weatherAppEl.querySelector(".humidity").textContent = "Humidity: "+data.main.humidity
weatherAppEl.querySelector(".windspeed").textContent = "Wind Speed: "+data.wind.speed
/*
const windspeed = document.createElement("div")
windspeed.classList.add(".windspeed")
windspeed.textContent = "Wind Speed: "+data.wind.speed
document.querySelector(".windspeed").appendChild(windspeed)
*/

    }catch(error){
      console.log("error:",error)  
      }
};

getData("paris")

formEl.addEventListener("submit",(event) => {
    event.preventDefault();
    let input = cityInput.value;
    getData(input);
});



function converter(UNIX_timestamp){
 let t = new Date(UNIX_timestamp*1000)  
 let months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
 let days = ['Sunday','Monday','Tuesday','Wenesday','Thursday','Friday','Saturday',]
 let year = t.getFullYear()
 let month = months[t.getMonth()]
 let date = t.getDate()
 let day = days[t.getDay()]
 let hour = t.getHours()
 let min = t.getMinutes()
  
 let time = day+' '+date+' '+month+ ' '+year;
  return time;
};

/*class converters{
    constructor(timestamp)  
    {
    this.timestamp = timestamp
    let t = new Date(this.timestamp*1000)   
    }
    
    getYear(){
      return this.t.getFullYear() 
    }
    
    getTime(){
      return getYear()
    }
};
let convert = new converter(timestamp)

console.log(convert.getTime(1698242432))*/

