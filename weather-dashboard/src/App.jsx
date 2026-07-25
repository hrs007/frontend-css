import React, { useState, useEffect } from 'react';
import { Search, Sun, Cloud, CloudRain, Wind, Droplets, Thermometer, MapPin, Loader2 } from 'lucide-react';

// Simulating an API call to a weather service
const fetchMockWeather = (city) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city: city.charAt(0).toUpperCase() + city.slice(1),
        temp: Math.floor(Math.random() * 20) + 10, // 10 to 30 C
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        forecast: [
          { day: 'Mon', temp: 22, type: 'Sunny' },
          { day: 'Tue', temp: 19, type: 'Rainy' },
          { day: 'Wed', temp: 24, type: 'Cloudy' },
          { day: 'Thu', temp: 26, type: 'Sunny' },
        ]
      });
    }, 1500); // 1.5s delay to show loading state
  });
};

export default function WeatherDashboard() {
  const [search, setSearch] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load weather on initial render and on search
  const loadWeather = async (cityToFetch) => {
    setLoading(true);
    const data = await fetchMockWeather(cityToFetch);
    setWeather(data);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather('London');
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) loadWeather(search);
  };

  const getWeatherIcon = (condition, className = "") => {
    switch(condition) {
      case 'Sunny': return <Sun className={`text-yellow-300 ${className}`} />;
      case 'Rainy': return <CloudRain className={`text-blue-300 ${className}`} />;
      case 'Cloudy': return <Cloud className={`text-gray-300 ${className}`} />;
      default: return <Sun className={`text-yellow-300 ${className}`} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 md:p-8 font-sans text-white">
      
      {/* Glass Container */}
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Current Weather */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/20 relative">
          
          <form onSubmit={handleSearch} className="relative z-10">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="w-full bg-white/20 border border-white/30 text-white placeholder-white/70 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <Search className="absolute left-4 top-3.5 text-white/70" size={20} />
          </form>

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin text-white mb-4" size={48} />
              <p className="text-white/80 animate-pulse">Fetching weather data...</p>
            </div>
          ) : weather && (
            <div className="flex-1 flex flex-col justify-center py-10 z-10">
              <div className="flex items-center gap-2 mb-4 text-white/80">
                <MapPin size={20} />
                <h2 className="text-2xl font-medium tracking-wide">{weather.city}</h2>
              </div>
              <div className="flex items-center gap-6 mb-6">
                {getWeatherIcon(weather.condition, "w-24 h-24 drop-shadow-lg")}
                <div>
                  <h1 className="text-7xl font-bold tracking-tighter">{weather.temp}°</h1>
                  <p className="text-2xl font-light text-white/90 mt-1">{weather.condition}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Decorative Background Blob */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        {/* Right Side: Details & Forecast */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          
          {loading ? (
            <div className="h-full flex items-center justify-center opacity-50">Loading details...</div>
          ) : weather && (
            <>
              {/* Detailed Stats */}
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="bg-black/10 rounded-2xl p-4 flex items-center gap-4">
                  <Thermometer className="text-white/70" size={24} />
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wider">Feels Like</p>
                    <p className="text-xl font-semibold">{weather.temp + 2}°</p>
                  </div>
                </div>
                <div className="bg-black/10 rounded-2xl p-4 flex items-center gap-4">
                  <Droplets className="text-white/70" size={24} />
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wider">Humidity</p>
                    <p className="text-xl font-semibold">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="bg-black/10 col-span-2 rounded-2xl p-4 flex items-center gap-4">
                  <Wind className="text-white/70" size={24} />
                  <div>
                    <p className="text-xs text-white/70 uppercase tracking-wider">Wind Speed</p>
                    <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>

              {/* 4-Day Forecast */}
              <div>
                <h3 className="text-lg font-medium mb-6 text-white/90">4-Day Forecast</h3>
                <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
                  {weather.forecast.map((day, idx) => (
                    <div key={idx} className="bg-white/10 rounded-2xl p-3 flex flex-col items-center justify-between h-32 hover:bg-white/20 transition-colors cursor-default">
                      <p className="text-sm font-medium text-white/80">{day.day}</p>
                      {getWeatherIcon(day.type, "w-8 h-8 my-2")}
                      <p className="text-lg font-bold">{day.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}