import { useState, useEffect } from 'react'
import { getWeatherInfo } from '../utils/weatherCode'
import { getCoordinates, getWeather } from '../services/weatherService'
import SearchBar from './SearchBar'
import WeatherDetails from './WeatherDetails'
import loadingGif from '../assets/images/loading.gif'

const WheatherApp = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const search = async (city) => {
    if (!city.trim()) return

    setLoading(true)
    setError(null)

    try {
      const coords = await getCoordinates(city)
      if (!coords) {
        setError('Cidade não encontrada. Tente novamente!')
        setData(null)
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
      setError('Ocorreu um erro ao buscar as informações do clima.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Faz a busca inicial ao carregar/dar refresh na página
  useEffect(() => {
    search('London')
  }, [])

  return (
    <div className="container">
      <div className="weather-app">
        <SearchBar
          onSearch={search}
          currentLocation={data ? `${data.cityName}, ${data.country}` : ''}
        />

        {loading && (
          <div className="loading" style={{ textAlign: 'center', margin: '20px 0' }}>
            <img src={loadingGif} alt="Carregando..." style={{ width: '50px' }} />
          </div>
        )}

        {error && !loading && (
          <div className="error-message" style={{ textAlign: 'center', color: '#ff6b6b', margin: '20px 0' }}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && data && <WeatherDetails data={data} />}
      </div>
    </div>
  )
}

export default WheatherApp