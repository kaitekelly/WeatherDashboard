
let city = $(".city");
let wind = $(".wind");
let humidity = $(".humidity");
let temp = $(".temp");

// let searchInput = $("#search").val();

// $(searchInput).attr("placeholder", "Search Destination Here");
// $(SearchInput).text(SearchTerm).prepend(".list-group-item");

//array search terms are pushed to
let searchArr = [];
let APIKey = "&appid=b9330bfd0b1bf5fe0c849c27df315565";

$(document).ready(function () {

    $("#searchBtn").click(function(event) {
        event.preventDefault();

        //grab search term from input search field
        let searchTerm = $("#search").val().trim();
        // let citySearch = $("#search").val();
        console.log(searchTerm);
        //construct the URL
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
         searchTerm + APIKey;

        //add name of search term to search array 
        searchArr.push(searchTerm);

        //add search term to top of list of cities
        $("<li>").text(searchTerm).prepend(".list-group-item");

        //ajax call for local weather
        $.ajax({
            type: "GET",
            url: queryURL
        }).then(function (response) {
            $("h1").text(JSON.stringify(response));
          
            //log queryURL
        // console.log(queryURL);
        //log the resulting object
        // console.log(response);

        // let cityResult  = searchTerm;

        //transfer content to HTML
        let cityName = $(".jumbotron").text(response.city + "Weather Details");
        let windData = $("<p>").text("Wind Speed:" + response.wind);
        let humidityData = $("<p>").text("Humidity:" + response.humidity);

        // Convert the temp to fahrenheit
        var tempF = (response.main.tempData - 273.15) * 1.80 + 32;
        //temp elements added to html
        let tempData = $("<p>").text("Temp (K):" + response.temp);
        let tempDataF = $("<p>").text("Temp (F):" + tempF);

        //append the elements together
        cityName.append(windData, humidityData, tempData, tempDataF);

        $("container").append(cityName);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);

        //need to add CitySearch text to li or city search name to searched list
        let cityResult = $("<li>").prepend(".list-group-item");
        });

    })
    
    
    
    // .then(function(response) {
        

   




})