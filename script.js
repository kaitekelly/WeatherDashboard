let searchTerm = $("search").val();


let city = $(".city");
let wind = $();
let APIKey = "b9330bfd0b1bf5fe0c849c27df315565";

let queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
searchTerm + APIKey;


$(document).ready(function() {

    $("#search").click() {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log();
        });




    }


    .then(function(response)) {





      // Convert the temp to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;  


    }




});

