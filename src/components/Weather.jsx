export default function Weather(prop) {

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
      
        let year = d.getFullYear();
      
        return `${day} ${date} ${month} ${year}`;
      }

    return (
        <div className='weather-container'>

          <div className='location-box'>
            <div className='location'>{prop.city}, {prop.country}</div>
            <div className='date'>{dateBuilder(new Date())}</div>

          </div>

          <div className="weather-box">
              <img src={prop.image} className='weather-image' alt="sun icon"/>
              <div className="weather">{prop.description}</div>
              <div className="temp">{prop.temp}°c </div>
              
          </div>
        </div>
    )
}