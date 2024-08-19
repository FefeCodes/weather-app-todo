let cityInput = document.getElementById("cityname")
let form = document.getElementById("form")
let APIKEY = `2de46d242e622d2f7379e93031b61613`
let weatherViewContainer = document.getElementById("weather-view-container")

form.addEventListener("submit", function(event){
    event.preventDefault()
    let city = cityInput.value
    collectWeatherReport(city)
    form.reset()
})

function collectWeatherReport(city){
    let weatherRequest = new XMLHttpRequest()
    weatherRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)

    weatherRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let data = JSON.parse(this.responseText)
            console.log(data)
            printWeatherOnUI(data)
        }
    }

    weatherRequest.send()
}

function printWeatherOnUI(data){
    let temperature = data.main.temp
    let humidity = data.main.humidity
    let nameOfCity = data.name
    let conditions = data.weather[0].description

    weatherViewContainer.innerHTML = ``

    let cityNameContainer = document.createElement("div")
cityNameContainer.classList.add("city-name-container")

let cityNameText = document.createElement("h1")
cityNameText.textContent = nameOfCity

let weatherResultContainer = document.createElement("div")
weatherResultContainer.classList.add("weather-result-container")

let leftContainer = document.createElement("div")
leftContainer.classList.add("left-container")

let temperatureContainer = document.createElement("div")
temperatureContainer.classList.add("temperature-container")

let temperatureTitle = document.createElement("p")
temperatureTitle.textContent = "Now"

let tempText = document.createElement("h5")
tempText.textContent = `${(temperature - 273.15).toFixed()}°C`

let rightContainer = document.createElement("div")
rightContainer.classList.add("right-container")

let conditionContainer = document.createElement("div")
conditionContainer.classList.add("condition")

let condition = document.createElement("h3")
condition.textContent = conditions

let humidityContainer = document.createElement("div")
humidityContainer.classList.add("humidity-container")

let humidityTitle = document.createElement("p")
humidityTitle.textContent = "Humidity:"

let humidityText = document.createElement("h5")
humidityText.textContent = `${humidity}%`


cityNameContainer.append(cityNameText)
temperatureContainer.append(temperatureTitle, tempText)
conditionContainer.append(condition)
humidityContainer.append(humidityTitle, humidityText)
leftContainer.append(temperatureContainer)
rightContainer.append(conditionContainer, humidityContainer)
weatherResultContainer.append(leftContainer, rightContainer)
weatherViewContainer.append(cityNameContainer, weatherResultContainer)
}