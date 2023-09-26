import axios from 'axios';
import { useState, useEffect } from 'react';
import Search from './components/Search';
import { createDate } from './utils/convertDate';

function App() {
  const [data, setData] = useState({});
  //const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [myLocation, setMyLocation] = useState({});

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const url = `https://api.openweathermap.org/data/2.5/forecast`;

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);

    // Search by lat,lon
    const [lat, lon] = searchData.value.split(' ');
    let api1 =
      url +
      '?lat=' +
      lat +
      '&lon=' +
      lon +
      '&appid=' +
      apiKey +
      '&units=metric';

    // const loc = searchData.label.split(', ')[0];
    // let api = url + '?q=' + loc + '&appid=' + apiKey + '&units=metric';

    fetch(api1)
      .then(async (response) => {
        const data = await response.json();
        setData(data);
      })
      .catch((error) => console.log(error));
  };

  console.log(data);

  // FOR SIMPLE SEARCH WITHOUT AUTOCOMPLETE
  // const searchLocation = async (e) => {
  //   setError(null); // Reset any previous errors
  //   // setLocation({});
  //   setData({});
  //   setMyLocation({});
  //   if (e.key === 'Enter')
  //     if (e.target.value.trim().length) {
  //       // setLocation(e.target.value.trim());
  //       console.log(e.target.value.trim());
  //       console.log(location);
  //       // setData({});
  //       // setMyLocation({});
  //       const url_daily = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${apiKey}`;
  //       try {
  //         const response = await axios.get(url_daily);
  //         if (response.status === 200) {
  //           setData(response.data);
  //         } else {
  //           setData({});
  //           setLocation('');
  //           setMyLocation({});
  //           setError('No location found :(');
  //         }
  //       } catch (err) {
  //         console.clear();

  //         setLocation('');
  //         setData({});
  //         setMyLocation({});
  //         setError('No location found :( Try again!');
  //         console.log(error);
  //       }
  //       setLocation('');
  //     } else {
  //       setMyLocation({});
  //       setData({});
  //       setLocation('');
  //       setError('You forgot to type the location :)');
  //     }
  // };

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

  // function createDate(dt, type) {
  //   let day = new Date(dt * 1000);
  //   if (type === 'long') {
  //     let options = {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'short',
  //       day: 'numeric'
  //     };
  //     return day.toLocaleString('en-us', options);
  //   } else {
  //     return day.toLocaleString('en-us', {
  //       weekday: 'long'
  //     });
  //   }
  // }

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
        <Search onSearchChange={handleOnSearchChange} />
        {/*FOR SIMPLE SEARCH WITHOUT AUTOCOMPLETE */}
        {/* <input
          type="text"
          value={location}
          name="city"
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={searchLocation}
          placeholder="Enter location..."
        /> */}
      </div>

      <div className="container">
        {(data.city && (
          <div className="top">
            <div className="location">
              <p>{data.list && createDate(data.list[0].dt, 'long')}</p>
              <p className="location-name">
                {data?.city?.name}, {data?.city?.country}
              </p>
            </div>
            <div className="main-info">
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
              </div>{' '}
            </div>
            {data.list !== undefined && (
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
                    <p className="bold">{data.list[0].wind.speed}MPS</p>
                  ) : null}
                  <p>Wind speed</p>
                </div>
              </div>
            )}
            {data.list !== undefined && (
              <>
                <div className="tomorrow">
                  <p className="box">Tomorrow</p>
                  <p className="bold">{data.list[7].main.temp.toFixed()}°C</p>
                  <img
                    src={
                      data.list[7].weather
                        ? `https://openweathermap.org/img/w/${data?.list[7].weather[0]?.icon}.png`
                        : null
                    }
                    alt="weather-icon"
                  />
                </div>
                <div className="tomorrow">
                  <p className="box">
                    {data.list && createDate(data.list[14].dt)}
                  </p>
                  <p className="bold">{data.list[14].main.temp.toFixed()}°C</p>
                  <img
                    src={
                      data.list[14].weather
                        ? `https://openweathermap.org/img/w/${data?.list[14].weather[0]?.icon}.png`
                        : null
                    }
                    alt="weather-icon"
                  />
                </div>
                <div className="tomorrow">
                  <p className="box">
                    {data.list && createDate(data.list[21].dt)}
                  </p>
                  <p className="bold">{data.list[21].main.temp.toFixed()}°C</p>
                  <img
                    src={
                      data.list[21].weather
                        ? `https://openweathermap.org/img/w/${data?.list[21].weather[0]?.icon}.png`
                        : null
                    }
                    alt="weather-icon"
                  />
                </div>
              </>
            )}
          </div>
        )) ||
          (myLocation.city && (
            <div className="top">
              <div className="location">
                <p>
                  {myLocation.list && createDate(myLocation.list[0].dt, 'long')}
                </p>
                <p className="location-name">
                  {myLocation.city.name}, {myLocation.city.country}
                </p>
              </div>
              <div className="main-info">
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
              </div>

              {myLocation.list !== undefined && (
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
                      <p className="bold">
                        {myLocation.list[0].main.humidity}%
                      </p>
                    ) : null}
                    <p>Humidity</p>
                  </div>
                  <div className="wind">
                    {myLocation.list ? (
                      <p className="bold">{myLocation.list[0].wind.speed}MPS</p>
                    ) : null}
                    <p>Wind speed</p>
                  </div>
                </div>
              )}

              {myLocation.list !== undefined && (
                <>
                  <div className="tomorrow">
                    <p className="box">Tomorrow</p>
                    <p className="bold">
                      {myLocation.list[7].main.temp.toFixed()}°C
                    </p>
                    <img
                      src={
                        myLocation?.list[7].weather
                          ? `https://openweathermap.org/img/w/${myLocation.list[7].weather[0]?.icon}.png`
                          : null
                      }
                      alt="weather-icon"
                    />
                  </div>
                  <div className="tomorrow">
                    <p className="box">
                      {myLocation.list && createDate(myLocation.list[14].dt)}
                    </p>
                    <p className="bold">
                      {myLocation.list[14].main.temp.toFixed()}°C
                    </p>
                    <img
                      src={
                        myLocation?.list[14].weather
                          ? `https://openweathermap.org/img/w/${myLocation.list[14].weather[0]?.icon}.png`
                          : null
                      }
                      alt="weather-icon"
                    />
                  </div>
                  <div className="tomorrow">
                    <p className="box">
                      {myLocation.list && createDate(myLocation.list[21].dt)}
                    </p>
                    <p className="bold">
                      {myLocation.list[21].main.temp.toFixed()}°C
                    </p>
                    <img
                      src={
                        myLocation?.list[21].weather
                          ? `https://openweathermap.org/img/w/${myLocation.list[21].weather[0]?.icon}.png`
                          : null
                      }
                      alt="weather-icon"
                    />
                  </div>
                </>
              )}
            </div>
          )) ||
          (error && <p className="error-message">{error}</p>)}
      </div>
    </div>
  );
}

export default App;
