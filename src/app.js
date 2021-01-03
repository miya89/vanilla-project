function formatDate(timestamp){
    let date= new Date(timestamp);
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let day=days[date.getDay()];
    let hours=date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes=date.getMinutes();
if (minutes < 10) {
        hminute = `0${minutes}`
    }
    return `${day} ${hours}:${minutes}`;
}

function showCityWeather(response){
    let tempElement=document.querySelector("#temp");
    let cityElement=document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let feelslikeElement=document.querySelector("#feel-like");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    
    dateElement.innerHTML=formatDate(response.data.dt * 1000);

    windElement.innerHTML=Math.round(response.data.wind.speed);
    feelslikeElement.innerHTML= Math.round(response.data.main.feels_like);
    humidityElement.innerHTML=response.data.main.humidity
    descriptionElement.innerHTML=response.data.weather[0].description
    cityElement.innerHTML= response.data.name
    tempElement.innerHTML=Math.round(response.data.main.temp);

}

let apiKey="d623c9d10b76ac8fadb3579bc392fa06"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`
console.log(apiUrl);
axios.get(apiUrl).then(showCityWeather);