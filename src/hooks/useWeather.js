import { useState, useEffect } from 'react'
import { getWeatherInfo } from '../utils/weatherCode'
import { getCoordinates, getWeather } from '../services/weatherService'

export const useWeather = (initialCity = 'London') => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
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

  useEffect(() => {
    fetchWeather(initialCity)
  }, [initialCity])

  return { data, loading, error, fetchWeather }
}