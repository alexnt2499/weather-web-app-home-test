import { geocodingAccessKey } from "../configs/config";

const BASE_API = "https://us1.locationiq.com/v1/";

export const searchApi = async (query: string) => {
  const response = await fetch(
    `${BASE_API}search?key=${geocodingAccessKey}&q=${query}&format=json`
  );
  const data = await response.json();
  return data;
};
