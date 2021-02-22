import React, { useState } from "react";

//Defines the use states for the walk form
function WalkForm(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");

  //Function to change the date, time and title when the form field change
  function handleChange(event) {
    let { name, value } = event.target;

    switch (name) {
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      case "title":
        setTitle(value);
        break;
    }
  }

  //Function to add the title, date and time to the table on submit
  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(title, date, time);
    setDate("");
    setTime("");
    setTitle("");
  }

  return (
    //Walk form
    <div className="WalkForm">
      <h2 id="EnterWalk"> Enter a walk</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title&nbsp;
          <input
            id="title"
            type="textarea"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>

        <label>
          Date&nbsp;
          <input type="date" name="date" value={date} onChange={handleChange} />
        </label>

        <label>
          Time&nbsp;
          <input type="time" name="time" value={time} onChange={handleChange} />
        </label>

        <button>Add walk</button>
      </form>
    </div>
  );
}

export default WalkForm;
