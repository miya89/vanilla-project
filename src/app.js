function formatDate(timestamp){
    let date= new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let day=days[date.getDay()];
   
    return `${day} ${formatHours(timestamp)}`;
}

function showCityWeather(response){
    let tempElement=document.querySelector("#temp");
    let cityElement=document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let feelslikeElement=document.querySelector("#feel-like");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon");

    celsiusTemperature=response.data.main.temp;

    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) ;
    iconElement.setAttribute("alt", response.data.weather[0].description);
    dateElement.innerHTML=formatDate(response.data.dt * 1000);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    feelslikeElement.innerHTML= Math.round(response.data.main.feels_like);
    humidityElement.innerHTML=response.data.main.humidity
    descriptionElement.innerHTML=response.data.weather[0].description
    cityElement.innerHTML= response.data.name
    tempElement.innerHTML=Math.round(response.data.main.temp);

}

function formatHours(timestamp){
     let date= new Date(timestamp)
  let hours=date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes=date.getMinutes();
if (minutes < 10) {
        minutes = `0${minutes}`
    }
    return `${hours}:${minutes}`
}

function showForecast(response){
let forecastElement= document.querySelector("#forecast");
forecastElement.innerHTML=null;
let forecast = null;


for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index]
forecastElement.innerHTML +=`
<div class="col-2">
                <h3>
                    ${formatHours(forecast.dt * 1000)}
                </h3>
                <img src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                 />
                <div class="weather-forecast-temp">
                    <strong id="max-temp">${Math.round(forecast.main.temp_max)}°</strong> <span id="min-temp">${Math.round(forecast.main.temp_min)}°</span>
                </div>
                </div>`;    
            
}
}

function search(city){
let apiKey="d623c9d10b76ac8fadb3579bc392fa06"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showCityWeather);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast)
}

function handleSearch(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}
function showFahrenheitTemperature(event){
    event.preventDefault();

    celsiusTemperatureLink.classList.remove("active");
    fahrenheitTemperatureLink.classList.add("active");

    let  temperatureElement=  document.querySelector("#temp");
    let fahrenheitTemperature= Math.round(celsiusTemperature * 9/5) + 32;
    temperatureElement.innerHTML=fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
    event.preventDefault()

    celsiusTemperatureLink.classList.add("active");
    fahrenheitTemperatureLink.classList.remove("active");

      let  temperatureElement=  document.querySelector("#temp");
      temperatureElement.innerHTML=Math.round(celsiusTemperature);

}

let celsiusTemperature= null;

let form=document.querySelector("#search-input");
form.addEventListener("submit", handleSearch)

let fahrenheitTemperatureLink=document.querySelector("#ftemp-link");
fahrenheitTemperatureLink.addEventListener("click", showFahrenheitTemperature)

let celsiusTemperatureLink=document.querySelector("#ctemp-link");
celsiusTemperatureLink.addEventListener("click", showCelsiusTemperature);

search("Lisbon");