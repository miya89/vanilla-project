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
        minutes = `0${minutes}`
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
    let iconElement=document.querySelector("#icon");

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
function search(city){
let apiKey="d623c9d10b76ac8fadb3579bc392fa06"
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(showCityWeather);
}

function handleSearch(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}


let form=document.querySelector("#search-input");
form.addEventListener("submit", handleSearch)

search("Lisbon");