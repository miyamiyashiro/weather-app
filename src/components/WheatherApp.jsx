import { useWeather } from '../hooks/useWeather'
import SearchBar from './SearchBar'
import WeatherDetails from './WeatherDetails'
import loadingGif from '../assets/images/loading.gif'

const WheatherApp = () => {
  const { data, loading, error, fetchWeather } = useWeather('London')

  return (
    <div className="container">
      <div className="weather-app">
        <SearchBar
          onSearch={fetchWeather}
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