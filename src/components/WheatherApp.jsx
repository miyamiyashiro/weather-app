import { useState } from 'react'
import sunny from '../assets/images/sunny.png'

const WheatherApp = () => {
  const [location, setLocation] = useState('')

  const handleInputChanges = (e) => {
    setLocation(e.target.value)
  }


  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            <div className="location">London</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="Enter Location" aria-label="Location" value={location} onChange={handleInputChanges} />
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="Clear sky" />
          <div className="weather-type">Clear</div>
          <div className="temp">28°</div>
        </div>
        <div className="weather-date">
          <p>Sat, 15 Ago</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-droplet" aria-hidden="true"></i>
            <div className="data">35%</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind" aria-hidden="true"></i>
            <div className="data">3 km/h</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WheatherApp
