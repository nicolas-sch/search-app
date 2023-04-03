import { useContext, useEffect } from "react";
import { Data } from "../App";
import axios from "axios";

export const useFetch = () => {
  const apiKey = "AIzaSyCzMin-Be41W69bOYgrBgToRBSVLNrIkw0";
  const searchId = "a7f5e0a4eff064b49";
  const imageResponseApiKey = "AIzaSyCzMin-Be41W69bOYgrBgToRBSVLNrIkw0";
  const imageResponseSearchId = "a7f5e0a4eff064b49";
  const {
    searchValue,
    setAllResponse,
    doSearch,
    setDoSearch,
    setIsSearch,
    setIsVoiceSearch,
    setIsAllResponseFound,
    setImageResponse,
    setIsImageResponseFound,
  } = useContext(Data);

  const getAllResponse = async () => {
    if (doSearch && searchValue !== "") {
      axios
        .get(
          `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchId}&q=${searchValue}`
        )
        .then((res) => {
          setAllResponse(res.data);
          setIsAllResponseFound(true);
        });
    }
  };

  const getImageResponse = () => {
    if (doSearch && searchValue !== "") {
      axios
        .get(
          `https://www.googleapis.com/customsearch/v1?key=${imageResponseApiKey}&cx=${imageResponseSearchId}&q=${searchValue}&searchType=image`
        )
        .then((res) => {
          setImageResponse(res.data);
          setIsImageResponseFound(true);
        });
    }
  };

  useEffect(() => {
    setDoSearch(false);
  }, []);
  
  useEffect(() => {
    if (doSearch) {
      console.log("I am in useFetch");
      setDoSearch(false);
      setIsVoiceSearch(false);
      setIsSearch(true);
      getAllResponse();
      getImageResponse();
    }
  }, [doSearch]);
};

export default useFetch;
