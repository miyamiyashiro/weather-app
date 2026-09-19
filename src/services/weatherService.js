export const getCoordinates = async (city) => {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  const response = await fetch(url)

  if (!response.ok) throw new Error('Falha ao buscar coordenadas')

  const result = await response.json()
  if (!result.results || result.results.length === 0) return null

  const place = result.results[0]
  return {
    name: place.name,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
  }
}

export const getWeather = async (latitude, longitude) => {
  const currentFields = [
    'temperature_2m',
    'relative_humidity_2m',
    'wind_speed_10m',
    'weather_code',
  ].join(',')

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${currentFields}&timezone=auto`
  const response = await fetch(url)

  if (!response.ok) throw new Error('Falha ao buscar dados do clima')

  const result = await response.json()
  return result.current
}