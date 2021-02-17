import React, { useEffect, useState } from "react";
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
  let [error, setError] = useState(null);
  let [forecast, setForecast] = useState(null);
  let [walks, setWalks] = useState([]);

  useEffect(() => {
    getWalks();
  }, []);

  const getWalks = () => {
    fetch("/walks")
      .then(result => result.json())
      .then(walks => {
        setWalks(walks);
      })
      //  console.log(response, "Response!")
      .catch(error => {
        console.log(error);
      });
  };

  console.log(walks, "This is walks!");

  function deleteWalk(id) {
    console.log("Delete walk console log" + id);
    let options = {
      method: "DELETE",
      body: JSON.stringify(walks)
    };

    fetch(`/walks/${id}`, options)
      .then(result => result.json())
      .then(walks => {
        setWalks(walks);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  function addWalk(title, date, time) {
    let newWalk = { title, date, time };
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //this tells the server in what format to expect the data
      body: JSON.stringify(newWalk) //object needs to converted to json (with stringify)
    };
    fetch("/walks", options)
      .then(result => result.json())
      .then(walks => {
        setWalks(walks);
      })
      .catch(err => {
        console.log("error!", err.message);
      });
  }

  const getWeather = async location => {
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
          <Form onSubmit={location => getWeather(location)} />
          {forecast && <Response forecast={forecast} />}
          <br></br>
        </Route>
        <Route path="/mywalks">
          <WalkForm
            onSubmit={(title, date, time) => addWalk(title, date, time)}
          />
          <WalkList walks={walks} onDelete={id => deleteWalk(id)} />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
