import React, { useState } from "react";

function WalkForm(props) {
  let [date, setDate] = useState("");
  let [time, setTime] = useState("");
  let [title, setTitle] = useState("");

  function handleChange(event) {
    let { name, value } = event.target;

    switch (name) {
      case "date":
        setDate(value);
        break;
      case "time":
        setTime(value);
        break;
      default:
        break;
      case "title":
        setTitle(value);
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    let walk = { date: date, time: time, title: title };
    props.onSubmit(walk);
    setDate("");
    setTime("");
    setTitle("");
  }

  return (
    <div className="WalkForm">
      <h2 id="EnterWalk"> Enter a walk</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            id="title"
            label="title"
            type="textarea"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
          {" "}
          Date
          <input
            label="date"
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
          />
        </label>
        <br></br>
        <label>
           Time
          <input type="time" name="time" value={time} onChange={handleChange} />
        </label>

        <button>Add</button>

        {/* display:
                Date at *time */}
      </form>
    </div>
  );
}

export default WalkForm;
