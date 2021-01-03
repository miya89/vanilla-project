function formatDate(timestamp){
    let date= new Date(timestamp);
    let day=date.getDay()
    //let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let hours=date.getHours();
    let minutes=date.getMinutes();

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
    dateElement=formatDate(response.data.dt * 1000)

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