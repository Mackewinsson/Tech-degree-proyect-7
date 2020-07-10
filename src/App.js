import React, { useState, useEffect } from "react";
// STYLES
import "./assets/styles/index.css";
// COMPONENTS
import Search from "./components/Seach.js";
import Nav from "./components/Nav.js";
import NotFound from "./components/NotFound";
// ROUTER
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
// API KEYS
import apiKey from "./config";
import PhotoContainer from "./components/PhotoContainer";

const App = () => {
  // DATA STATE
  const [cats, setCats] = useState(null);
  const [dogs, setDogs] = useState(null);
  const [hamsters, setHamsters] = useState(null);
  const [search, setSearch] = useState(null);
  // FETCHING DATA FOR DEFAULT VIEW
  useEffect(() => {
    fetchCats();
    fetchDogs();
    fetchhamster();
    searchFetch();
  }, []);

  //This method fetches the CAT topic link
  const fetchCats = async () => {
    try {
      const fetchCats = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cats&per_page=24&format=json&nojsoncallback=1`
      );
      const result = await fetchCats.json();
      const cats = result.photos.photo;
      setCats(cats);
    } catch (error) {
      console.log("Error occurred while fetching and parsing the data", error);
    }
  };
  //This method fetches the DOG topic link
  const fetchDogs = async () => {
    try {
      const fetchDogs = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=dogs&per_page=24&format=json&nojsoncallback=1`
      );
      const result = await fetchDogs.json();
      const dogs = result.photos.photo;
      setDogs(dogs);
    } catch (error) {
      console.log("Error occurred while fetching and parsing the data", error);
    }
  };

  //This funtion fetches the COMPUTERS topic link
  const fetchhamster = async () => {
    try {
      const fetchhamster = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=hamsters&per_page=24&format=json&nojsoncallback=1`
      );
      const result = await fetchhamster.json();
      const hamsters = result.photos.photo;
      setHamsters(hamsters);
    } catch (error) {
      console.log("Error occurred while fetching and parsing the data", error);
    }
  };
  // This will fetch the api with a new set of images
  const searchFetch = async (query) => {
    try {
      const searchFetch = await fetch(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`
      );
      const fetchResult = await searchFetch.json();
      const searchResult = fetchResult.photos.photo;
      setSearch(searchResult);
    } catch (error) {
      console.log("Error occurred while fetching and parsing data", error);
    }
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Search onSearch={searchFetch} />
        <Nav />
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/cats" />} />
          <Route
            path="/search/:query"
            render={() => <PhotoContainer data={search} />}
          />
          <Route
            path="/cats"
            render={() => <PhotoContainer data={cats} tag={"Cats"} />}
          />
          <Route
            path="/dogs"
            render={() => <PhotoContainer data={dogs} tag={"Dogs"} />}
          />
          <Route
            path="/hamsters"
            render={() => <PhotoContainer data={hamsters} tag={"Hamsters"} />}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
