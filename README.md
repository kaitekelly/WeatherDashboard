# WeatherDashboard

LINK TO DEPLOYED SITE: https://kaitekelly.github.io/WeatherDashboard/

This is a weather dashboard application to tell me today's weather and 5 day future forecast for a city that I search.
Data included in the forecast is windspeed, humidity, Temp in fahrenheit, and UV index level with badge indicating safety level. 

Built with: HTML, CSS, JS, Bootstrap, OpenWeather Api's for weather data, moment js for date information and Google fonts api. Weather symbol pulled in from openweather api.
Link to openweather api and documentation: https://openweathermap.org/api

This appliction was built with a combination of bootstrap framework and dynamically created javascript elements. The navbar, search field, search button and jumbotron were created with Bootstrap. The weather display and 5 day forecast cards are dynamically created using Javascript. The search field captures the search term and retrieves the weather for that city with two seperate ajax calls to the openweather api. The weather icon is also retrieved with an ajax call to the openweather api. Cities searched will display in button form in a list on the left side of the application. When each city button is clicked, the application will display weather results for that city. 

Plans for future development:
Add a clear search list button to clear local storage to clear city search buttons list.  

Pull in a picture of the city searched and display in the jumbotron with the weather. You could use a photo api to pull in and display the page. 



Picture of Weather Dashboard when user firsts visits the site
<img width="1586" alt="Screen Shot 2020-05-19 at 7 15 12 PM" src="https://user-images.githubusercontent.com/61023907/82397345-1c633880-9a05-11ea-94b5-2b9cbc165e7f.png">

Picture of Weather Dashboard after user does a weather search by city
<img width="1589" alt="Screen Shot 2020-05-19 at 7 12 41 PM" src="https://user-images.githubusercontent.com/61023907/82397269-ed4cc700-9a04-11ea-85a3-59e1a75c7034.png">


