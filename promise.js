// fetch("GET", "./index.js").then((data)=>{
//    console.log(data)
// })
let city = "Lagos"
let APIKEY = "2de46d242e622d2f7379e93031b61613"

function collectData(){
    let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    fetch(endpoint).then((data)=>{
        return data.json()
     }).then((collectedData)=>{
        printOnUI(collectedData)
     })
     console.log(collectedData)
}
collectData()