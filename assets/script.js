var searchBtn= document.querySelector("#button");
let buttonGet= document.querySelector('#get');
let getInput= document.querySelector('#input-get');
let result= document.querySelector('#result');
var daily_list = []
var APIkey= "cab2b90c7efb39aa8c0b5157b74c9a87";
var cityName = ""
var cityList= []
var cityDiv= document.querySelector(".Cities")
console.log("cityname "+ cityName)
var savedCity= JSON.parse(localStorage.getItem("weatherInfo"))
for (let i = 0; i < savedCity.length; i++) {
    
var cityBtn= document.createElement("button")
cityBtn.innerHTML= savedCity[i]
cityBtn.setAttribute("class", "btn btn-primary btn-sm")
cityDiv.append(cityBtn)
}
function getApi(event){
    event.preventDefault()
   
    cityName = getInput.value 
    cityList.push(cityName)
    localStorage.setItem("weatherInfo",JSON.stringify(cityList))
    // console.log("calling get api")
    // //console.log("textbox " + textbox)
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=cab2b90c7efb39aa8c0b5157b74c9a87`
    console.log("request " + requestUrl);
        fetch(requestUrl)
        .then(response => {
           return response.json();
         })
          .then(json => {
            // likely to be json.delivery but cannot 
            // confirm until rate limits have been lifted
            var records = JSON.stringify(json.list)
            var arr = JSON.parse(records)
            var list = []
            arr.forEach(element => {
                date = String(element.dt_txt).split(" ")[0] 
                if(list.length >= 5){
                    return daily_list
                }
                if(list.includes(date) === false){
                    list.push(date)
                    daily_list.push(element)
                }
                

            });
            console.log(list)
            //links it to HTML
            //Temp Vars
            var monTemp = document.querySelector(".monTemp")
            var tuesTemp = document.querySelector(".tuesTemp")
            var wedTemp = document.querySelector(".wedTemp")
            var thursTemp = document.querySelector(".thursTemp")
            var friTemp = document.querySelector(".friTemp")
            //Humidity Vars
            var monHum= document.querySelector(".monHum")
            var tuesHum= document.querySelector(".tuesHum")
            var wedHum= document.querySelector(".wedHum")
            var thursHum = document.querySelector(".thursHum")
            var friHum = document.querySelector(".friHum")
            //Wind Vars
            var monWind= document.querySelector(".monWind")
            var tuesWind= document.querySelector(".tuesWind")
            var wedWind= document.querySelector(".wedWind")
            var thursWind = document.querySelector(".thursWind")
            var friWind = document.querySelector(".friWind")

            //sets the text to the corresponding live data call
            //Set The Temp
            monTemp.innerHTML = daily_list[0].main.temp
            tuesTemp.innerHTML = daily_list[1].main.temp
            wedTemp.innerHTML = daily_list[2].main.temp
            thursTemp.innerHTML = daily_list[3].main.temp
            friTemp.innerHTML = daily_list[4].main.temp
            
            //Set The Humidity
            monHum.innerHTML = daily_list[0].main.humidity
            tuesHum.innerHTML = daily_list[1].main.humidity
            wedHum.innerHTML = daily_list[2].main.humidity
            thursHum.innerHTML = daily_list[3].main.humidity
            friHum.innerHTML = daily_list[4].main.humidity

            //Set The Wind
            monWind.innerHTML = daily_list[0].wind.speed
            tuesWind.innerHTML = daily_list[1].wind.speed
            wedWind.innerHTML = daily_list[2].wind.speed
            thursWind.innerHTML = daily_list[3].wind.speed
            friWind.innerHTML = daily_list[4].wind.speed

            console.log(daily_list)
          })
}

  searchBtn.addEventListener("click", getApi)
  