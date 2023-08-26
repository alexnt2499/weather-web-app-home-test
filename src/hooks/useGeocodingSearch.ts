import { useState } from "react"
import { searchApi } from "../apis/geocodingAPI"
import { requestWeatherApi } from "../apis/weatherAPI"
import { WeatherInfoData } from "../types/WeatherType"

export const useGeocodingSearch = () => { 
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [dataInfo ,setDataInfo] = useState<WeatherInfoData>()
    const [error, setError] = useState('')

    const search = async (query: string) => {
        setIsLoading(true)
        setError('')
        try {
            const dataOfSearch = await searchApi(query);
            console.log(dataOfSearch);
            if(dataOfSearch.length <= 0) return 
            setData(dataOfSearch)
            const {lat, lon} = dataOfSearch[0]
            onSubmitSearch(lat, lon)
          } catch (error) {
            setError('Error when get location lat, lon for search')
            setData([])
            setDataInfo(undefined)
          } finally {
            setIsLoading(false)
        }
    }

    const onSubmitSearch = async (lat: number, lon: number) => {
      setIsLoading(true)
        try {
            const dataOfSearch = await requestWeatherApi({lat, lon});
            setDataInfo(dataOfSearch)
          } catch (error) {
            setError('Error when get weather')
            setData([])
            setDataInfo(undefined)

          } finally {
            setIsLoading(false)
        }
    }

    return {search, isLoading, data, dataInfo, error}
}