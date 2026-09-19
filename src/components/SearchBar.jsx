import { useState } from 'react'

const SearchBar = ({ onSearch, currentLocation }) => {
  const [location, setLocation] = useState('')

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(location)
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
          onClick={() => onSearch(location)}
        ></i>
      </div>
    </div>
  )
}

export default SearchBar