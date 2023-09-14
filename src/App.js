import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [myLocation, setMyLocation] = useState({});

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/forecast`;
  const url_daily = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;

  const searchLocation = async (e) => {
    setError(null); // Reset any previous errors
    if (e.key === 'Enter' && e.target.value.length) {
      try {
        const response = await axios.get(url_daily);
        if (response.status === 200) {
          setData(response.data);
        } else {
          setData({});
          setLocation('');
          setMyLocation({});
          setError('No location found :(');
        }
      } catch (err) {
        console.clear();

        setLocation('');
        setData({});
        setMyLocation({});
        setError('No location found :( Try again!');
        console.log(error);
      }
      setLocation('');
    }
  };

  function getWeather() {
    if (window.navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      let api =
        url +
        '?lat=' +
        latitude +
        '&lon=' +
        longitude +
        '&appid=' +
        apiKey +
        '&units=metric';

      fetch(api)
        .then((response) => response.json())
        .then((weather) => {
          setMyLocation(weather);
        });
    }

    function error() {
      setMyLocation({});
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div
      className={`app ${
        (data.list &&
          (data?.list[0]?.main?.temp < 20
            ? 'animated-bg-cold'
            : data?.list[0]?.main?.temp > 20
            ? 'animated-bg-warm'
            : null)) ||
        (myLocation.list &&
          (myLocation.list[0].main?.temp < 20
            ? 'animated-bg-cold'
            : myLocation.list[0].main?.temp > 20
            ? 'animated-bg-warm'
            : null))
      }`}
    >
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter location..."
        />
      </div>

      <div className="container">
        {(data.city && (
          <div className="top">
            <div className="location">
              <p className="location-name">
                {data?.city?.name}, {data?.city?.country}
              </p>
            </div>
            <div className="temp">
              {data.list ? (
                <h1>{data.list[0].main?.temp.toFixed()}°C</h1>
              ) : null}
            </div>
            <div className="description">
              {data.list && (
                <img
                  src={
                    data.list[0].weather
                      ? `https://openweathermap.org/img/w/${data?.list[0].weather[0]?.icon}.png`
                      : null
                  }
                  alt="weather-icon"
                />
              )}
              {data.list ? (
                <p className="small">{data.list[0].weather[0].main}</p>
              ) : null}
            </div>

            {data.list !== undefined && (
              <div className="tomorrow">
                <p>In 24 hours</p>
                <p className="bold">{data.list[7].main.temp.toFixed()}°C</p>
              </div>
            )}
          </div>
        )) ||
          (myLocation.city && (
            <div className="top">
              <div className="location">
                <p className="location-name">
                  {myLocation.city.name}, {myLocation.city.country}
                </p>
              </div>
              <div className="temp">
                {myLocation.list ? (
                  <h1>{myLocation?.list[0].main?.temp?.toFixed()}°C</h1>
                ) : null}
              </div>
              <div className="description">
                {myLocation.list && (
                  <img
                    src={
                      myLocation?.list[0].weather
                        ? `https://openweathermap.org/img/w/${myLocation.list[0].weather[0]?.icon}.png`
                        : null
                    }
                    alt="weather-icon"
                  />
                )}
                {myLocation.list ? (
                  <p className="small">
                    {myLocation?.list[0].weather[0]?.main}
                  </p>
                ) : null}
              </div>

              {myLocation.list !== undefined && (
                <div className="tomorrow">
                  <p>In 24 hours</p>
                  <p className="bold">
                    {myLocation.list[7].main.temp.toFixed()}°C
                  </p>
                </div>
              )}
            </div>
          )) ||
          error}

        {(data.list !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.list ? (
                <p className="bold">
                  {data.list[0].main.feels_like.toFixed()}°C
                </p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.list ? (
                <p className="bold">{data.list[0].main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.list ? (
                <p className="bold">{data.list[0].wind.speed}MPH</p>
              ) : null}
              <p>Wind speed</p>
            </div>
          </div>
        )) ||
          (myLocation.list !== undefined && (
            <div className="bottom">
              <div className="feels">
                {myLocation.list ? (
                  <p className="bold">
                    {myLocation.list[0].main.feels_like.toFixed()}°C
                  </p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className="humidity">
                {myLocation.list ? (
                  <p className="bold">{myLocation.list[0].main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {myLocation.list ? (
                  <p className="bold">{myLocation.list[0].wind.speed}MPH</p>
                ) : null}
                <p>Wind speed</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
