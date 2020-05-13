let city = $(".city");
let wind = $(".wind");
let humidity = $(".humidity");
let temp = $(".temp");

//array search terms are pushed to
let searchArr = [];
let APIKey = "&appid=b9330bfd0b1bf5fe0c849c27df315565";

$(document).ready(function () {
    renderSearchList();


    $("#searchBtn").click(function (event) {
        event.preventDefault();
        triggerSearch();

        function triggerSearch() {

            //grab search term from input search field
            let searchTerm = $("#search").val().trim();

            //construct the URL
            let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
                searchTerm + APIKey;


            //add search term to top of list of cities
            $("<button>").text(searchTerm).prepend(".list-group-item");
            //ajax call for local weather
            $.ajax({
                type: "GET",
                url: queryURL
            }).then(function (response) {
                $("h1").text(JSON.stringify(response));
                console.log(response.name);
                let previousCity = JSON.parse(localStorage.getItem("cities"));
                if (previousCity) {
                    previousCity.push(response.name);
                    localStorage.setItem("cities", JSON.stringify(previousCity));
                } else {
                    searchArr.push(response.name)
                    localStorage.setItem("cities", JSON.stringify(searchArr));
                }
                //transfer content to HTML
                let cityName = $(".jumbotron").text(searchTerm + " Weather Details  ").addClass("city-weather");
                // console.log(cityName);
                let currentDate = moment().format("  MM-DD-YYYY");
                // console.log(currentDate);
                let windData = $("<p>").text("Wind Speed: " + response.wind.speed).addClass("lead");
                let humidityData = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("lead");
                var iconcode = response.weather[0].icon;
                var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
                let weatherImg = $("<img>").attr("src", iconurl);
                let date = $("<p>").text(moment.unix().format("MMM Do YY")).addClass("lead");
                // console.log(date);
                $("#five-day").empty();
                // Convert the temp to fahrenheit
                let tempF = (response.main.temp - 273.15) * 1.80 + 32;
                let roundedTemp = Math.floor(tempF);

                //temp elements added to html
                let tempData = $("<p>").text("Temp (K): " + response.main.temp + "°").addClass("lead");
                let tempDataF = $("<p>").text("Temp (F): " + roundedTemp + "°").addClass("lead");

                //append the elements together
                cityName.append(weatherImg, currentDate, windData, humidityData, tempData, tempDataF);
                $("container").append(cityName);

                //ajax call for UV Index
                let latitude = response.coord.lat;
                let longitude = response.coord.lon;
                let uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
                $.ajax({
                    type: "GET",
                    url: uvIndexURL,
                }).then(function (responseUV) {
                    let currentUV = $("<div>").addClass('lead uv-index').text("UV Index: ");
                    let uvValue = $("<span class='badge id='current-uv-level'>").text(responseUV.value);
                    currentUV.append(uvValue);
                    if (responseUV.value >= 0 && responseUV.value < 3) {
                        $(uvValue).addClass("badge-success");
                    } else if (responseUV.value >= 3 && responseUV.value < 6) {
                        $(uvValue).addClass("badge-mild");
                    } else if (responseUV.value >= 6 && responseUV.value < 8) {
                        $(uvValue).addClass("badge-warning");
                    } else if (responseUV.value >= 8 && responseUV.value < 11) {
                        $(uvValue).addClass("badge-veryhigh");
                    } else if (responseUV.value >= 11) {
                        $(uvValue).addClass("badge-danger");
                    }
                    cityName.append(currentUV);
                    renderSearchList();
                })

                //start 5 day forecast ajax
                let day5QueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + APIKey;

                for (let i = 1; i < 6; i++) {
                    $.ajax({
                        url: day5QueryURL,
                        type: "GET"
                    }).then(function (response5Day) {
                        let cardbodyElem = $("<div>").addClass("card-body");

                        let fiveDayCard = $("<div>").addClass(".cardbody");
                        let fiveDate = $("<h5>").text(moment.unix(response5Day.daily[i].dt).format("MM/DD/YYYY"));
                        fiveDayCard.addClass("headline");

                        let fiveDayTemp = $("<p>").text("Temp: " + response5Day.daily[i].temp.max + "°");
                        fiveDayTemp.attr("id", "#fiveDayTemp[i]");

                        let fiveHumidity = $("<p>").attr("id", "humDay").text("Humidity: " + JSON.stringify(response5Day.daily[i].humidity) + "%");
                        fiveHumidity.attr("id", "#fiveHumidity[i]");

                        let iconCode = response5Day.daily[i].weather[0].icon;
                        let iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";
                        let weatherImgDay = $("<img>").attr("src", iconURL);
                        $("#testImage").attr("src", iconURL);

                        cardbodyElem.append(fiveDate);
                        cardbodyElem.append(weatherImgDay);
                        cardbodyElem.append(fiveDayTemp);
                        cardbodyElem.append(fiveHumidity);
                        fiveDayCard.append(cardbodyElem);
                        $("#five-day").append(fiveDayCard);
                        $("#fiveDayTemp[i]").empty();
                    })
                }
                $("#search").val("");
                $(document).on("click", ".city-btn", function() {
                    JSON.parse(localStorage.getItem("cities"));
                    console.log(this);
                    let searchTerm = $(this).text();
                    console.log(searchTerm);
                    // triggerSearch();
                    
            
                });
            })
            
        }
    })



    function renderSearchList() {
        let searchList = JSON.parse(localStorage.getItem("cities"));
        $("#search-list").empty();
        if (searchList) {
            for (i = 0; i < searchList.length; i++) {
                let listBtn = $("<button>").addClass("btn btn-secondary city-btn").attr('id', 'cityname_' + (i + 1)).text(searchList[i]);
                let listElem = $("<li>").attr('class', 'list-group-item');
                listElem.append(listBtn);
                $("#search-list").append(listElem);
            }

        }

    }
  
})

// function renderLastSearch() {
//     let cityName = localStorage.getItem("cities");
//     cityName.text()
// }

// $("city-btn").click(function () {
//     JSON.parse(localStorage.getItem("cities"));
//     console.log(this);


// })