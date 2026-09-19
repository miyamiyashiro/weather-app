import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'

const weatherImages = { sunny, cloudy, rainy, snowy }

const WeatherDetails = ({ data }) => {
  return (
    <>
      <div className="weather">
        <img
          src={weatherImages[data.weatherType] || sunny}
          alt={data.weatherDescription}
        />
        <div className="weather-type">{data.weatherDescription}</div>
        <div className="temp">{data.temperature}°</div>
      </div>
      <div className="weather-date">
        <p>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
          })}
        </p>
      </div>
      <div className="weather-data">
        <div className="humidity">
          <div className="data-name">Humidity</div>
          <i className="fa-solid fa-droplet" aria-hidden="true"></i>
          <div className="data">{data.humidity}%</div>
        </div>
        <div className="wind">
          <div className="data-name">Wind</div>
          <i className="fa-solid fa-wind" aria-hidden="true"></i>
          <div className="data">{data.windSpeed} km/h</div>
        </div>
      </div>
    </>
  )
}

export default WeatherDetails