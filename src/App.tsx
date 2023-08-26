import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import { useGeocodingSearch } from "./hooks/useGeocodingSearch";
import moment from "moment";
import { useHistorySearch } from "./hooks/useHistorySearch";
import { MagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import Spinner from "./components/Spinner";

function App() {
  const { search, isLoading, dataInfo, error } = useGeocodingSearch();
  const { listHistorySearch, addHistorySearch, removeHistorySearch } =
    useHistorySearch();
  const [cityText, setCityText] = useState("");
  const [countryText, setCountryText] = useState("");

  const handleSearchCity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityText(e.target.value);
  };

  const handleSearchCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryText(e.target.value);
  };

  const handleSearch = () => {
    if (cityText && countryText) {
      search(`${cityText} ${countryText}`);
      addHistorySearch(`${cityText}, ${countryText}`);
    }
  };

  const handleClear = () => {
    setCityText("");
    setCountryText("");
  };

  const handleClickSearchHistory = (text: string) => {
    search(text.replace(",", " "));
  };

  const renderDataInfo = () => {
    return (
      dataInfo && (
        <div className="mt-6">
          <p className="text-gray-400">
            {dataInfo?.name}, {dataInfo?.sys.country}
          </p>
          <h3 className="font-bold mt-2 text-3xl">
            {dataInfo?.weather[0].main}
          </h3>
          <div className="mt-2 grid grid-cols-2 w-[340px]">
            <p className="col-span-1">Description: </p>
            <p className="col-span-1">{dataInfo?.weather[0].description}</p>

            <p className="col-span-1">Temperature: </p>
            <p className="col-span-1">
              {dataInfo?.main.temp_min} &deg;C ~ {dataInfo?.main.temp_max}
              &deg;C
            </p>

            <p className="col-span-1">Humidity</p>
            <p className="col-span-1">{dataInfo?.main?.humidity ?? 0}%</p>
            <p className="col-span-1">Time:</p>
            <p className="col-span-1">
              {moment(dataInfo?.dt * 1000).format("YYYY-MM-DD HH:mm A")}
            </p>
          </div>
        </div>
      )
    );
  };

  return (
    <>
      <div className="container p-16 max-sm:p-5">
        <h1 className="font-bold text-2xl">Today's Weather</h1>

        <div className="container flex max-sm:flex-col max-sm:items-center items-end gap-3">
          <Input
            onChange={handleSearchCity}
            label="City"
            className="mt-4 max-sm:w-full"
            value={cityText}
          />
          <Input
            onChange={handleSearchCountry}
            label="Country"
            className="mt-4 max-sm:mt-0 max-sm:w-full"
            value={countryText}
          />
          <Button
            isLoading={isLoading}
            onClick={handleSearch}
            className="max-h-9 max-sm:w-full"
          >
            Search
          </Button>
          <Button
            isLoading={isLoading}
            onClick={handleClear}
            className="max-h-9 max-sm:w-full"
          >
            Clear
          </Button>
        </div>
        {error && !isLoading && (
          <p className="text-red-500 mt-3 p-2 w-full bg-red-200 border border-red-500">
            {error}
          </p>
        )}
        {isLoading ? <Spinner className="mt-16" /> : renderDataInfo()}

        <h1 className="font-bold text-2xl mt-10">Search history</h1>
        <div className="container">
          {listHistorySearch.length === 0 && (
            <p className="mt-3 text-sm font-light text-slate-400">
              There is no search history (No record)
            </p>
          )}
          {listHistorySearch.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mt-4 border-b pb-2"
            >
              <p>{item.text}</p>
              <div className="flex gap-2 items-center">
                <p>{moment(item.time).format("hh:mm:ss A")}</p>
                <button
                  onClick={() => handleClickSearchHistory(item.text)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 "
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-black" />
                </button>
                <button
                  onClick={() => removeHistorySearch(item.id)}
                  className="p-1 rounded-full bg-slate-200 hover:bg-slate-300 "
                >
                  <TrashIcon className="h-4 w-4 text-black" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
