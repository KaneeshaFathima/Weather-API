import React from 'react'
import sunIcon from './assets/sunny.jpg'
import rainicon from './assets/rain.png'
import driizle from './assets/drizzle.png'
import humidityImage from './assets/humidity.png'
import windImage from './assets/wind.png'
import snow from './assets/snow.jpg'

const Weatherdetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
    return (
        <>
            <div className="image">
                <img src={icon} alt="sun" />
            </div>
            <div className="temperature">{temp}°C</div>
            <div className="city">{city}</div>
            <div className="country">{country}</div>
            <div className="coord">
                <div>
                    <span className='lat'>Latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="lon">Longtitude</span>
                    <span>{lon}</span>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityImage} alt="humidity" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={windImage} alt="wind" className="icon" />
                    <div className="data">
                        <div className="wind-percent">{wind}km/hr``</div>
                        <div className="text">wind speed</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Weatherdetails
