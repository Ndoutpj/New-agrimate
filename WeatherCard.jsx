import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock weather data - in production this would come from a weather API
  const mockWeatherData = {
    location: "Thohoyandou, Limpopo",
    temperature: 28,
    condition: "Sunny",
    humidity: 45,
    windSpeed: 12,
    uvIndex: 8,
    icon: "Sun",
    forecast: [
      { day: "Today", high: 30, low: 18, icon: "Sun" },
      { day: "Tomorrow", high: 32, low: 20, icon: "Sun" },
      { day: "Wednesday", high: 29, low: 17, icon: "CloudSun" }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchWeather = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWeatherData(mockWeatherData);
      setLoading(false);
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="animate-pulse">
          <div className="h-6 bg-white bg-opacity-20 rounded mb-4 w-1/2"></div>
          <div className="h-12 bg-white bg-opacity-20 rounded mb-2 w-1/3"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded w-1/4"></div>
        </div>
        
        {/* Animated clouds during loading */}
        <div className="absolute top-4 right-4 animate-cloud">
          <Icon name="Cloud" size={32} color="rgba(255,255,255,0.3)" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden elevation-2">
      {/* Animated background clouds */}
      <div className="absolute top-2 right-8 animate-cloud opacity-20">
        <Icon name="Cloud" size={48} color="white" />
      </div>
      <div className="absolute top-8 right-16 animate-cloud opacity-10" style={{ animationDelay: '10s' }}>
        <Icon name="Cloud" size={32} color="white" />
      </div>
      {/* Main weather info */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold opacity-90">{weatherData?.location}</h3>
            <p className="text-sm opacity-75">Current Weather</p>
          </div>
          <div className="animate-grow">
            <Icon name={weatherData?.icon} size={48} color="white" />
          </div>
        </div>

        <div className="flex items-end space-x-4 mb-4">
          <div className="text-4xl font-bold">{weatherData?.temperature}°C</div>
          <div className="text-lg opacity-90 pb-1">{weatherData?.condition}</div>
        </div>

        {/* Weather details */}
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Droplets" size={16} color="white" />
            <span>{weatherData?.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Wind" size={16} color="white" />
            <span>{weatherData?.windSpeed} mph</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Sun" size={16} color="white" />
            <span>UV {weatherData?.uvIndex}</span>
          </div>
        </div>

        {/* 3-day forecast */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          {weatherData?.forecast?.map((day, index) => (
            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-2 text-center">
              <div className="font-medium mb-1">{day?.day}</div>
              <Icon name={day?.icon} size={20} color="white" className="mx-auto mb-1" />
              <div className="flex justify-center space-x-1">
                <span className="font-semibold">{day?.high}°</span>
                <span className="opacity-75">{day?.low}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;