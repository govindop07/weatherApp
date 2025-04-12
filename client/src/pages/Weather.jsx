import React, { useState } from "react";
import axiosInstance from '../lib/axios.js';
import { FaSun } from "react-icons/fa";

const SearchBar = () => {
  const [resData, setResData] = useState({
    weather: "clear sky",
    city: "Mathura",
    temp: "39.23°C",
    temp_max: "39.23°C",
    temp_min: "39.23°C",
    humidity: "13",
  });
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(true);

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.target);
    const city = formData.get('city');

    try {
      const res = await axiosInstance.post(`/weather/${city}`, {city});
      setCity("");
      setResData(res.data);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  const handleChange = (e)=>{
    setCity(e.target.value);
  }

  const handleDark = (e)=>{
    setDark((prev => !prev));
  }

  return (
    <div className={`flex flex-col gap-6 justify-center items-center h-screen pt-4 ${dark?"bg-gray-900": ""}`}>
      <h1 className={`text-4xl ${dark?"bg-gray-900 text-white": ""}`}>Search for the weather</h1>

      <form onSubmit={handleSubmit} className={`flex flex-col justify-center items-center gap-6 ${dark?"text-black":""}`}>
        <input name="city" type="text" onChange={handleChange} value={city} placeholder="Search City*" required className={`p-3 rounded-lg border focus:border-blue-500 ${dark?"bg-gray-900 text-white": ""}`}/>
        {error &&
          <p className="text-red-400">City not found</p>
        }
        <button type="submit" className="text-white p-2 px-4 cursor-pointer hover:bg-blue-600 shadow-2xl rounded-lg shadow-gray-500 bg-blue-500">Search</button>
      </form>

      <div className={`p-4 px-6 shadow-2xl rounded-2xl flex flex-col items-center justify-center gap-4 ${dark?"bg-gray-800 text-white": "bg-red-50"}`}>
        <h1 className="text-3xl">Weather info- {resData.weather}</h1>
        <div>
          <img className="h-60 rounded-sm" src="https://media.istockphoto.com/id/531889697/photo/weather-forecast-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=lXbZdVHgxSFdx8Ud0Q66wybUZ5xy7BlGIuLYaConVMQ=" alt="" />
        </div>
        <div className="text-md text-center font-semibold">
          <h3 className="text-center text-2xl mb-4">{resData.city}</h3>
          <h3>Temperature: {resData.temp}</h3>
          <h3>Maximum temperature: {resData.temp_max}</h3>
          <h3>Minimum temperature: {resData.temp_min}</h3>
          <h3>Humidity: {resData.humidity}</h3>
        </div>
      </div>

      <button onClick={handleDark} className={`text-4xl shadow-2xl rounded-2xl cursor-pointer absolute top-5 right-5 bg-gray-500 p-2 ${dark?"bg-gray-600 text-white": "bg-white"}`}>
        <FaSun />
      </button>
    </div>
  );
};

export default SearchBar;
