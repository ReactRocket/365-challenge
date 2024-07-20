let city;

const searchInput = document.getElementById("searchInput");
const submitBtn = document.getElementById("submitBtn");
const dataList = document.getElementById("dataList");
const suggestionBox = document.getElementById("suggestionBox");

window.addEventListener('load',()=>{
    searchInput.focus()
})

searchInput.addEventListener("keyup", (e) => {
    if (e.target.value) {
        let searchResult = suggestionList(e.target.value)
        if (searchResult) {
           suggestionBox.style.display = 'flex'
        }
    } else {
        suggestionBox.style.display = 'none'
    }
    if (dataList.innerHTML) {
        dataList.innerHTML = "";
    }
    city = e.target.value;
});

submitBtn.addEventListener("click", handleSearch);

function handleSearch() {
  if (!!city) {
    getWeatherByCity(city);
  } else {
    alert("Please enter city name!");
    searchInput.focus();
  }
}

function getWeatherByCity(city) {
  fetch(`http://localhost:3000/weather?city=${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length) {
        dataList.innerHTML = `
                  <li><h3>City:- ${data[0].city}</h3></li>
                  <li><h3>Humidity:- ${data[0].humidity}</h3></li>
                  <li><h3>Temperature:- ${data[0].temperature}</h3></li>
                  <li><h3>Weather:- ${data[0].weather}</h3></li>
                  <li><h3>WindSpeed:- ${data[0].windSpeed}</h3></li>
                  `;
        saveSearchHistory(city,data)
      } else {
        alert("No City Found! Please try again with new city.");
        searchInput.value = ''
        searchInput.focus();
      }
    })
    .catch((err) => console.error("Error is:- " + err));
}

function saveSearchHistory(city,data){
    let searchHistory = localStorage.getItem('searchHistory') || []

    if (searchHistory.length ) {
        searchHistory = JSON.parse(searchHistory)
        if (!searchHistory.find(obj => obj.city == city)) {
            searchHistory.push(data[0])
            localStorage.setItem('searchHistory',JSON.stringify(searchHistory))
        }
    }else{
        searchHistory.push(data[0])
        localStorage.setItem('searchHistory',JSON.stringify(searchHistory))
    }
}

function suggestionList(city){
    let searchHistory = localStorage.getItem('searchHistory') || []
    if (searchHistory.length ) {
        searchHistory = JSON.parse(searchHistory)
        let searchResult = searchHistory.find(obj => obj.city.includes(city))
        if (searchResult) {
            suggestionBox.innerHTML = `
            <li>${searchResult.city}</li>
          `
          return searchResult;
        }else{
          suggestionBox.innerHTML = ""
        }
    }

}
