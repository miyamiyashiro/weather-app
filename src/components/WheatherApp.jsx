import { getWeatherInfo } from '../utils/weatherCode'
import { useState } from 'react'
import sunny from '../assets/images/sunny.png'
import cloudy from '../assets/images/cloudy.png'
import rainy from '../assets/images/rainy.png'
import snowy from '../assets/images/snowy.png'

const weatherImages = {
  sunny,
  cloudy,
  rainy,
  snowy,
}

const WheatherApp = () => {
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChanges = (e) => {
    setLocation(e.target.value)
  }

  const getCoordinates = async (city) => {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch coordinates')
    }

    const result = await response.json()
    if (!result.results || result.results.length === 0) {
      return null
    }

    const place = result.results[0]
    return {
      name: place.name,
      country: place.country,
      latitude: place.latitude,
      longitude: place.longitude,
    }
  }

  const getWeather = async (latitude, longitude) => {
    const currentFields = [
      'temperature_2m',
      'relative_humidity_2m',
      'wind_speed_10m',
      'weather_code',
    ].join(',')

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${currentFields}&timezone=auto`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const result = await response.json()
    return result.current
  }

  const search = async (city) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const coords = await getCoordinates(city)
      if (!coords) {
        setError('Cidade não encontrada')
        setData(null)
        setLoading(false)
        return
      }

      const weatherData = await getWeather(coords.latitude, coords.longitude)
      const weatherInfo = getWeatherInfo(weatherData.weather_code)

      setData({
        cityName: coords.name,
        country: coords.country,
        temperature: Math.round(weatherData.temperature_2m),
        humidity: weatherData.relative_humidity_2m,
        windSpeed: weatherData.wind_speed_10m,
        weatherType: weatherInfo.type,
        weatherDescription: weatherInfo.description,
      })
    } catch (err) {
      setError('Erro ao buscar dados do clima')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      search(location)
    }
  }

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
            <div className="location">{data ? `${data.cityName}, ${data.country}` : 'London'}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              aria-label="Location"
              value={location}
              onChange={handleInputChanges}
              onKeyDown={handleKeyDown}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              role="button"
              aria-label="Pesquisar cidade"
              tabIndex={0}
              onClick={() => search(location)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  search(location)
                }
              }}
            ></i>
          </div>
        </div>

        {loading && <div className="loading">Carregando...</div>}

        {error && <div className="error">{error}</div>}

        {!loading && !error && (
          <>
            <div className="weather">
              <img
                src={data ? weatherImages[data.weatherType] : sunny}
                alt={data ? data.weatherDescription : 'Clear sky'}
              />
              <div className="weather-type">{data ? data.weatherDescription : 'Clear'}</div>
              <div className="temp">{data ? `${data.temperature}°` : '28°'}</div>
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
                <div className="data">{data ? `${data.humidity}%` : '35%'}</div>
              </div>
              <div className="wind">
                <div className="data-name">Wind</div>
                <i className="fa-solid fa-wind" aria-hidden="true"></i>
                <div className="data">{data ? `${data.windSpeed} km/h` : '3 km/h'}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default WheatherApp
