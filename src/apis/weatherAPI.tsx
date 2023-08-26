import { weatherAccessKey } from "../configs/config";

const BASE_API = "https://api.openweathermap.org/data/2.5/";

export const requestWeatherApi = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}) => {
  const response = await fetch(
    `${BASE_API}weather?lat=${lat}&lon=${lon}&exclude=current&appid=${weatherAccessKey}`
  );
  const data = await response.json();
  return data;
};
