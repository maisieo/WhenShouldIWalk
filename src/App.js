import React, { useState } from "react";
import "./App.css";
import Header from "./Components/Header.js";
import { Route, Switch } from "react-router-dom";
import WalkForm from "./Components/WalkForm.js";
import WalkList from "./Components/WalkList.js";
import Form from "./Components/Form.js";
import Response from "./Components/Response.js";

const BASEURL = "http://api.weatherapi.com/v1";
const API_KEY = "05d2e662aca243ef99c223826210402";

function App() {
  const [error, setError] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [walks, setWalks] = useState([{}]);

  function addWalk(walk) {
    let newWalkArray = [...walks, walk];
    setWalks((walks) => newWalkArray);
  }

  const getWeather = async (location) => {
    console.log("location -->", location);
    let url = `${BASEURL}/forecast.json?key=${API_KEY}&q=${location}&days=1`;
    // sets the url for the query
    setForecast(null);

    try {
      console.log(url);
      let response = await fetch(url);

      // call fetch, wait for return
      if (response.ok) {
        console.log("Response ok");
        // server received and understood the request
        let data = await response.json();
        setForecast(data); //update state
      } else {
        console.log("Run into an error");
        setError(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log("Ended up in catch");
      setError(`Network error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        {/* Using 'exact' else route will match everything */}
        <Route path="/" exact>
          <Form onSubmit={(location) => getWeather(location)} />
          {forecast && <Response forecast={forecast} />}
        </Route>
        <Route path="/mywalks">
          <WalkForm onSubmit={(w) => addWalk(w)} />
          {walks && <WalkList walks={walks} />}
        </Route>
      </Switch>
    </div>
  );
}
export default App;
