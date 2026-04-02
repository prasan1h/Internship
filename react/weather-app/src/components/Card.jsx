import React, { useEffect, useState } from "react";
// import './Card.css'

const Card = () => {
  const [data, setData] = useState(null);
  const API_KEY = "d7ec23cee3c244ae5a5895b51d6220e6";
  const LAT = 12.998279203932084;
  const LON = 77.53807675455761;
  const URL = `https://api.openweathermap.org/data/3.0/onecall?lat=${LAT}&lon=${LON}&exclude=hourly,daily&appid=${API_KEY}`;

  const URL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}`;

  function fetchWeather() {
    fetch(URL2)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((e) => {
        console.log("failed to fetch :", e);
      });
  }

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
  <div className="bg-blue-200 flex flex-col">
    <div className="flex justify-between">
      <div>
        <p>Location : {data?.name}</p>
      </div>

      <div>
        <p>
          Lat : {data?.coord?.lat} & Lon1 : {data?.coord?.lon} 
        </p>
      </div>
    </div>

    <div className="flex justify-center items-center">
      <p>{data?.weather[0]?.description}</p>
    </div>

    <div className="flex justify-center items-center">
      <p>
        temp : {data?.main?.temp} °F and feels like {data?.main?.feels_like} °F
      </p>
    </div>

    <div className="flex justify-between">
        <div>
            <p>humidity : {data?.main?.humidity}</p>
        </div>
        <div>
            <p>wind speed : {data?.wind?.speed} km/hr</p>
        </div>
    </div>
  </div>
);
}

export default Card;
