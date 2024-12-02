
import './App.css'
// images
import searchicon from './assets/searchicon.png'
import Weatherdetails from './Weatherdetails'
import sunIcon from './assets/sun.png'
import rainicon from './assets/rain.png'
import snowy from './assets/snowy.png'
import { useEffect, useState } from 'react'
import clearsky from './assets/clear-sky.png'
import clearskyn from './assets/moons.png'
import clouds from './assets/clouds.png'
import rainwithsun from './assets/rain with sun.png'
import rainnight from './assets/rain night.png'
import rainclouds from './assets/rain-cloud.png'
import thunder from './assets/thunder.png'
import snownight from './assets/snow night.png'
import fog from './assets/fog.png'
import fognight from './assets/fognight.png'


function App() {
  const [text, setText] = useState("thoothukudi")
  const [icon, setIcon] = useState(sunIcon);
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState('India')
  const [lat, setLat] = useState(0)
  const [lon, setLan] = useState(0)
  const [humidity, setHumidity] = useState(0)
  const [wind, setWind] = useState(0)
  const [loading, setLoading] = useState(false)
  const [cityNotFound, setcityNotFound] = useState(false)
  const [error, setError] = useState("")




  const weatherIconMap = {
    "01d": clearsky,
    "01n": clearskyn,
    '02d': clouds,
    "02n": clouds,
    "03d": rainicon,
    "03n": rainicon,
    "04d": rainicon,
    "04n": rainnight,
    "09d": rainwithsun,
    "09n": rainnight,
    "10d": rainicon,
    "10n": rainicon,
    "11d": rainclouds,
    "11n": thunder,
    "13d": snowy,
    "13n": snownight,
    "50d": fog,
    "50n": fognight
  }

  const Search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=a57230c79219b68e4345dbf3fc549299&units=Metric`
    try {
      let res = await fetch(url)
      let data = await res.json();
      if (data.cod == '404') {
        console.log('City Not Found')
        setcityNotFound(true);
        setLoading(false)
        return;
      } {
        setCity(data.name)
        setCountry(data.sys.country)
        setHumidity(data.main.humidity)
        setLan(data.coord.lon)
        setLat(data.coord.lat)
        setWind(data.wind.speed)
        setTemp(Math.floor(data.main.temp))
        const weatherIconCode = data.weather[0].icon;
        setIcon(weatherIconMap[weatherIconCode] || clearsky)
        setcityNotFound(false)
      }
    } catch (error) {
      console.log(error.message)
      setError('An error occured while fetching data')
    } finally {
      setLoading(false)
    }

  }
  function handleInput(e) {
    setText(e.target.value)
  }
  function handleEnter(e) {
    if (e.key === 'Enter')
      Search();

  }
  useEffect(() => {
    Search()
  }, [])

  return (
    <>
      <div className='container'>
        <div className="input-container">
          <input
            type="text"
            className='cityInput'
            placeholder='Search City'
            onChange={handleInput}
            value={text}
            onKeyDown={handleEnter}
          />
          <div className="search">
            <img src={searchicon} alt="search" className="searchicon" onClick={() => { return Search() }} />
          </div>

        </div>

        {loading && <div className='loading'>Loading...</div>}
        {error && <div className="error">{error}</div>}
        {cityNotFound && <div className='citynotfound'>City Not Found</div>}

        {!loading && !cityNotFound && <Weatherdetails icon={icon} temp={temp} city={city} country={country}
          lat={lat} lon={lon} humidity={humidity} wind={wind} />}
      </div>

    </>
  )
}

export default App
