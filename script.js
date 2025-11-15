const form = document.querySelector("form");
let card = document.querySelector("#card");
const apiKey = "ff45dafffc2a5732af33da0615015d77";
let cityName = "";


// performing actions after clicking of the submit button
form.addEventListener("submit", async event => {

        event.preventDefault();

        let city = document.querySelector("#cityInput").value;
        cityName = city; 

        if(city) {

            try {

                const data = await getWeatherData(city);

                getWeatherInfo(data);
            }
            catch(error){
                console.error("unable to fetch data");
                errorResponse("unable to fetch data");
            }
        }
        else {
            console.error("please enter a city");
            errorResponse("please enter a city");
        }

});

async function getWeatherData(city) {

            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error("could not fetch data")
            }

            return response.json();
}

function getWeatherInfo(data) {

        const{main: {temp, humidity}, weather: [{description, id}]} = data;

        card.textContent = "";
        card.classList.add("card")

        if (card.style.display === "none") {
            card.style.display = "block";
        }

        card.style.height = "400px";

        let cityDisplay = document.createElement("h1");
        let tempDisplay = document.createElement("p");
        let humidityDisplay = document.createElement("p");
        let weatherDisplay = document.createElement("p");
        let emojiDisplay = document.createElement("p");
         

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("temperatureDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        weatherDisplay.classList.add("descriptionDisplay");
        emojiDisplay.classList.add("emojiDisplay");

        cityDisplay.textContent = cityName;
        tempDisplay.textContent = `${temp}°C`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        weatherDisplay.textContent = `${description}`;
        emojiDisplay.textContent = `${getEmoji(id)}`;

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(weatherDisplay);
        card.appendChild(emojiDisplay);
}

function errorResponse(message) {

        card.textContent = "";
        let errorMessage = document.createElement("p");
        
        if (!card.classList.contains("card")) {
            card.classList.add("card");
        }

        card.style.height = "fit-content";

        if (card.style.display === "none") {
            card.style.display = "block";
        }

        errorMessage.classList.add("errorDisplay");

        errorMessage.textContent = `${message}`;

        card.append(errorMessage);

}

function getEmoji(id) {

        let emoji = "";

        if (id >= 200 && id < 300) {
            emoji = "⛈️";
        } else if (id >= 300 && id < 600) {
            emoji = "🌧️";
        } else if (id >= 600 && id < 700) {
            emoji = "❄️";
        } else if (id >= 700 && id < 800) {
            emoji = "🌪️";
        } else if (id == 800) {
            emoji = "☀️";
        } else if (id > 800) {
            emoji = "☁️";
        }

        return emoji;
 }