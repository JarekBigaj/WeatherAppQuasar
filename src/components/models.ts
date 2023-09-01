export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface WeatherProps {
  temperature: number;
  winddirection: number;
  windspeed: number;
  weatherCode: number;
}
export interface cityProps {
  key: string;
  name: string;
  country: string;
  longitude: number;
  latitude: number;
}
