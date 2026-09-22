import { useState } from 'react'

const SearchBar = ({ onSearch, currentLocation }) => {
  const [location, setLocation] = useState('')

  const handleSearch = () => {
    if (location.trim()) {
      onSearch(location)
      setLocation('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="search">
      <div className="search-top">
        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
        <div className="location">{currentLocation || 'Digite uma cidade'}</div>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Location"
          aria-label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <i
          className="fa-solid fa-magnifying-glass"
          role="button"
          aria-label="Pesquisar cidade"
          tabIndex={0}
          onClick={handleSearch}
        ></i>
      </div>
    </div>
  )
}

export default SearchBar