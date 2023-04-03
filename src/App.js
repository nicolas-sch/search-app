import React from "react";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from "./components/SearchPage/SearchPage";
import VoiceSearch from "./components/HomePage/VoiceSearch";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useFetch from "./components/useFetch";
import { useContext } from "react";


const Data = React.createContext(null);
export { Data };

function App() {
  const [doSearch, setDoSearch] = useState(false);
  const [allResponse, setAllResponse] = useState({});
  const [imageResponse, setImageResponse] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isVoiceSearch, setIsVoiceSearch] = useState(false);
  const [isAllResponseFound, setIsAllResponseFound] = useState(false);
  const [isImageResponseFound, setIsImageResponseFound] = useState(false);
  return (
    <BrowserRouter>
      <Data.Provider
        value={{
          isVoiceSearch,
          setIsVoiceSearch,
          isSearch,
          setIsSearch,
          searchValue,
          setSearchValue,
          allResponse,
          setAllResponse,
          doSearch,
          setDoSearch,
          isAllResponseFound,
          setIsAllResponseFound,
          imageResponse,
          setImageResponse,
          isImageResponseFound,
          setIsImageResponseFound,
        }}
      >
        <Wrapper />
      </Data.Provider>
    </BrowserRouter>
  );
}
const Wrapper = () => {
  useFetch();
  const { isVoiceSearch, isSearch, searchValue, setDoSearch } =
    useContext(Data);
  useEffect(() => {
    if (searchValue === "") {
    } else {
      setDoSearch(true);
    }
  }, [searchValue]);
  return (
    <>
      {isVoiceSearch ? (
        <VoiceSearch />
      ) : (
        <>{isSearch ? <SearchPage /> : <HomePage />}</>
      )}
    </>
  );
};

export default App;
