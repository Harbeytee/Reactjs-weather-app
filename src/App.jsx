import { useState, useEffect } from 'react'
import weatherNews from './assets/weather-news.png'
import sun from './assets/sun.png'
import cloud from './assets/clouds.png'
import rain from './assets/rain.png'
import snow from './assets/snow.png'
import storm from './assets/storm.png'
import drizzle from './assets/drizzle.png'
import './App.css'
import Weather from './components/Weather'
const api = {
  key: "a96751e2a5ad2f34104e782f01f85577",
  base: "https://api.openweathermap.org/data/2.5/"
}

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}




function App() {
  
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState([]);
  /*const [lat, setLat] = useState([])
  const [long, setLong] = useState([])
  const [data, setData] = useState([])*/


  /*useEffect(() => {
    const fetchData = async () => {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      }
    )

    console.log ( `latitude is ${lat}` )
    console.log ( `longitude is ${long}` )



    const response = await fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`)
    const result = await response.json()
    console.log(result)
    setData(result)
    console.log(response)
    }
    
      fetchData()

  }, [lat, long])*/

  
    
    
    
 
  

  

  function search(e) {
    if(e.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => { 
         
          setWeather(result)
          setQuery('')
          
          }
      );
    }
  }

  

  function weathericon() {
    if (weather.weather[0].main == 'Clouds') {
      
      return cloud
    }
    else if(weather.weather[0].main == 'Rain') {
      return rain
    }
    else if(weather.weather[0].main == 'Clear') {
      return sun
    }
    else if(weather.weather[0].main == 'Snow') {
      return snow
    }
    else if(weather.weather[0].main == 'Thunderstorm') {
      return storm
    }
    else if(weather.weather[0].main == 'Drizzle') {
      return drizzle
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

    else if(icon == rain || icon == drizzle) {
      return 'App rainy'
    }

    else if(icon == cloud) {
      return 'App cloudy'
    }
    else if(icon == storm) {
      return 'App storm'
    }

    return 'App'

  }
  const styles = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    imageRendering: 'pixelated',
    
  }
  return (
    <div style ={styles} className={changeBackground()}>
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

          <Weather 
          city ={weather.name}
          country={weather.sys.country}
          image={weathericon()}
          description={weather.weather[0].description}
          temp={Math.round(weather.main.temp)}
          />
          
        
        :
        <div className='not-found'>
          city not found!
        </div>
        :
        /*
        typeof data.main !== 'undefined' && <Weather 
        city ={data.name}
        country={data.sys.country}
        /*image={weathericon()}
        description={data.weather[0].description}
        temp={Math.round(data.main.temp)}
        />*/
       

        

          
        <div className="weather-box">
          <img className='weatherNews' src={weatherNews} />
          
        </div> 

        

        }
      </main>
    </div>
  )
}

export default App
