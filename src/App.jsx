import { useState } from 'react'
import weatherNews from './assets/weather-news.png'
import sun from './assets/sun.png'
import cloud from './assets/clouds.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import './App.css'
const api = {
  key: import.meta.env.VITE_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}


const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];

  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);

  function search(e) {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => { 
         
          setWeather(result)
          setQuery('')
          console.log(result)
          }
      );
    }
  }

  

  function weathericon() {
    if (weather.weather[0].main == 'Clouds') {
      if(weather.main.temp < 0) {
        return snow
      }
      return cloud
    }
    else if(weather.weather[0].main == 'Rain') {
      return rain
    }
    else if(weather.weather[0].main == 'Clear') {
      return sun
    }
    console.log(weather.weather[0].main)
    
      return cloud
    
  }
  
  function changeBackground() {
    if(typeof weather.main !== "undefined") {
      var icon = weathericon()
    }
    

    if(icon == sun) {
      return 'App sunny'
    }

    else if (icon == snow) {
      return 'App frosty'
    }

    else if(icon == rain) {
      return 'App rainy'
    }

    else if(icon == cloud) {
      return 'App cloudy'
    }


    return 'App'



    /*if(typeof weather.main!== 'undefined') {
      if (weather.main.temp < 16) {
          return 'App cold'
      }
      return 'App'
    }
    return 'App'*/
  }

  return (
    <div className={changeBackground()}>
      <main>
        <div className="search">
          <input type="text" 
          className="search-bar" 
          placeholder='Search....'
          onChange={e => setQuery(e.target.value)} 
          value={query}
          onKeyPress={search}
          
          />
        </div>

        {
          !Array.isArray(weather)?
          typeof weather.main != "undefined"?
          
        <div className='weather-container'>

          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>

          </div>

          <div className="weather-box">
              <img src={weathericon()} className='weather-image' alt="sun icon"/>
              <div className="weather">{weather.weather[0].description}</div>
              <div className="temp">{Math.round(weather.main.temp)}°c </div>
              
          </div>
        </div>
        :
        <div className='not-found'>
          city not found!
        </div>
        :
        <div className="weather-box">
          <img className='weatherNews' src={weatherNews} />
          
        </div> 

        

        }
      </main>
    </div>
  )
}

export default App
