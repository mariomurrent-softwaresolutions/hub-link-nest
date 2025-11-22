import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind } from "lucide-react";

interface WeatherData {
  temperature: number;
  windSpeed: number;
  weatherCode: number;
}

interface WeatherWidgetProps {
  latitude: number;
  longitude: number;
  cityName: string;
}

const WeatherWidget = ({ latitude, longitude, cityName }: WeatherWidgetProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`
        );
        const data = await response.json();
        
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          windSpeed: Math.round(data.current.wind_speed_10m),
          weatherCode: data.current.weather_code,
        });
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes
    return () => clearInterval(interval);
  }, [latitude, longitude]);

  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun className="h-8 w-8 text-yellow-500" />;
    if (code <= 3) return <Cloud className="h-8 w-8 text-muted-foreground" />;
    if (code <= 67) return <CloudRain className="h-8 w-8 text-blue-500" />;
    return <Cloud className="h-8 w-8 text-muted-foreground" />;
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Klar";
    if (code <= 3) return "Bewölkt";
    if (code <= 67) return "Regen";
    if (code <= 77) return "Schnee";
    return "Bewölkt";
  };

  if (isLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">{cityName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Laden...</p>
        </CardContent>
      </Card>
    );
  }

  if (!weather) return null;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">{cityName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getWeatherIcon(weather.weatherCode)}
            <div>
              <p className="text-3xl font-bold text-foreground">{weather.temperature}°C</p>
              <p className="text-sm text-muted-foreground">
                {getWeatherDescription(weather.weatherCode)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Wind className="h-4 w-4" />
          <span>{weather.windSpeed} km/h</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
