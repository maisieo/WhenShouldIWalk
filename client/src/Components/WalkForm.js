import React, { useState } from "react";

function WalkForm(props) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");

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

  function handleSubmit(event) {
    event.preventDefault();
    // let walk = { date: date, time: time, title: title };
    props.onSubmit(title, date, time);
    setDate("");
    setTime("");
    setTitle("");
  }

  return (
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

        {/* display:
                Date at *time */}
      </form>
    </div>
  );
}

export default WalkForm;
