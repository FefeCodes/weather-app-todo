
let form = document.getElementById("form")
let input = document.getElementById("city")
let countrydiv = document.getElementById("countrydiv")



    
    let city = "Abuja"

    console.log(city)
    let weatherRequest = new XMLHttpRequest()
     let APIKEY = "2de46d242e622d2f7379e93031b61613"
    weatherRequest.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`)


    weatherRequest.onreadystatechange = function(){

        if(this.readyState == 4 && this.status == 200){
            let data = JSON.parse(this.responseText)
            printDataOnUI(data)
        }
    }

    function printDataOnUI(data){
        let temperature = data.main.temp
        let convertedTemp = (temperature -273.15).toFixed()
        
        let tempText = document.createElement("p")
        tempText.textContent = `Your State Temperature is ${convertedTemp}`
        countrydiv.append(tempText)
        console.log(convertedTemp)
    
    }

    weatherRequest.send()
    console.log(Date())