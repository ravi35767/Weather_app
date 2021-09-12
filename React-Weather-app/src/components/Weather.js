import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";
import TextField from '@material-ui/core/TextField';

function Weather() {
  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  const APIKEY = "858f15fed9292cbe25c341a754c55e45";
  async function weatherData(e) {
    e.preventDefault();
    if (form.city == "") {
      alert("Add City and country");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    console.log("name", e.target.name);
    console.log("value", e.target.value);
    let name = e.target.name;
    let value = e.target.value;

    if (name == "city") {
      setForm({ ...form, city: value });
    }
    if (name == "country") {
      setForm({ ...form, country: value });
    }
  };
  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <TextField style={{marginRight: 5, marginBottom: 10,}} id="outlined-basic" name="city" label="City" variant="outlined" onChange={(e) => handleChange(e)} />
        <TextField id="outlined-basic" name="country" label="Country" variant="outlined" onChange={(e) => handleChange(e)} />

        &nbsp; &nbsp; &nbsp;&nbsp;

        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>

      {/* {console.log(weather)} */}
      {weather.data != undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
