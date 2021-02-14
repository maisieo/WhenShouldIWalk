import React, { useState } from "react";
import Collapsible from "react-collapsible";
import "./Form.css";

function Form(props) {
  //  define the initial use state of the form
  const [location, setLocation] = useState("");

  const handleChange = (e) => {
    // handle key presses
    setLocation(e.target.value);
    // e is the event that receives the event, which has a property of value
    // sets the location field
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(location);
    setLocation("");
    // resets to empty string
  };
  return (
    <div className="CityForm">
      <h2> When should I take my walk? </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Location
          <input
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="I live in..."
          />
          {/* Don't want a submit button, need to find a way to submit just with "enter" */}
        </label>
      </form>
    </div>
  );
}

export default Form;
