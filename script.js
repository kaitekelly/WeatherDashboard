let city = $(".city");
let wind = $(".wind");
let humidity = $(".humidity");
let temp = $(".temp");

//array search terms are pushed to
let searchArr = [];
let APIKey = "&appid=b9330bfd0b1bf5fe0c849c27df315565";

$(document).ready(function () {

    $("#searchBtn").click(function (event) {
        event.preventDefault();

        //grab search term from input search field
        let searchTerm = $("#search").val().trim();
        // $("#search").empty();

        //construct the URL
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            searchTerm + APIKey;

        //add name of search term to search array 
        searchArr.push(searchTerm);
        //add search term to top of list of cities
        $("<button>").text(searchTerm).prepend(".list-group-item");
        //ajax call for local weather
        $.ajax({
            type: "GET",
            url: queryURL
        }).then(function (response) {
            $("h1").text(JSON.stringify(response));
            //transfer content to HTML
            let cityName = $(".jumbotron").text(searchTerm + " Weather Details").addClass("city-weather");
            let currentDate = moment().format("  MM-DD-YYYY");
            console.log(currentDate);
            let windData = $("<p>").text("Wind Speed: " + response.wind.speed).addClass("lead");
            let humidityData = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("lead");
            var iconcode = response.weather[0].icon;
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            let weatherImg = $("<img>").attr("src", iconurl);
            let date = $("<p>").text(moment.unix().format("MMM Do YY")).addClass("lead");
            console.log(date);
            $("#taco").empty();
            // Convert the temp to fahrenheit
            let tempF = (response.main.temp - 273.15) * 1.80 + 32;
            let roundedTemp = Math.floor(tempF);

            //temp elements added to html
            let tempData = $("<p>").text("Temp (K): " + response.main.temp + "°").addClass("lead");
            let tempDataF = $("<p>").text("Temp (F): " + roundedTemp + "°").addClass("lead");

            //append the elements together
            cityName.append(weatherImg, currentDate, windData, humidityData, tempData, tempDataF);
            $("container").append(cityName);
            $("<li>").attr('id', 'li').appendTo(".list-group-item").text(searchTerm);

            //ajax call for UV Index
            let latitude = response.coord.lat;
            let longitude = response.coord.lon;
            let uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + latitude + "&lon=" + longitude;
            $.ajax({
                type: "GET",
                url: uvIndexURL,
            }).then(function (responseUV) {
                console.log(responseUV);
                let currentUV = $("<div>").attr('id', '#uv-index').text("UV Index: " + responseUV.value).addClass("lead");
                console.log(responseUV.value);
                console.log(currentUV);

                if (currentUV >= 0 && currentUV < 3) {
                    $("#uv-index").addClass("badge-success");
                } else if (currentUV >= 3 && currentUV < 8) {
                    $("#uv-index").addClass("badge-warning");
                } else if (currentUV >= 8) {
                    $("#uv-index").addClass("badge-danger");
                }
                cityName.append(currentUV);

            })

            //start 5 day forecast ajax
            let day5QueryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial" + APIKey;

            for (let i = 1; i < 6; i++) {
            $.ajax({
                url: day5QueryURL,
                type: "GET"
            }).then(function (response5Day) {
                console.log(response5Day);
                    let cardbodyElem = $("<div>").addClass("card-body");
                
                    let fiveDayCard = $("<div>").addClass(".cardbody");
                    let fiveDate = $("<h5>").text(moment.unix(response5Day.daily[i].dt).format("MM/DD/YYYY"));
                    fiveDayCard.addClass("headline");
                    console.log(fiveDate);

                    let fiveDayTemp = $("<p>").text("Temp: " + response5Day.daily[i].temp.max);
                    console.log(fiveDayTemp);
                    fiveDayTemp.attr("id", "#fiveDayTemp[i]");

                    let fiveHumidity = $("<p>").attr("id", "humDay").text("Humidity: " + JSON.stringify(response5Day.daily[i].humidity));
                    fiveHumidity.attr("id", "#fiveHumidity[i]");

                    console.log(fiveHumidity);
                    let iconCode = response5Day.daily[i].weather[0].icon;
                    console.log(iconCode);
                    let iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                    let weatherImgDay = $("<img>").attr("src", iconURL);
                    $("#testImage").attr("src", iconURL);
                    console.log(weatherImgDay);

                    cardbodyElem.append(fiveDate);
                    cardbodyElem.append(weatherImgDay); 
                    cardbodyElem.append(fiveDayTemp); 
                    cardbodyElem.append(fiveHumidity);
                    fiveDayCard.append(cardbodyElem);
                    $("#taco").append(fiveDayCard);

                    $("#fiveDayTemp[i]").empty();
                    console.log(response5Day);
                    // $(fiveDayTemp).empty();
                    // $(fiveHumidity).empty();

                })

            }
        })


    })

})