import React from "react";

function WalkList(props) {
  return (
    <div className="WalkList">
      <h2>My walks</h2>
      <ul>
        {props.walks &&
          props.walks.map(t => (
            <li key={t.date}>
              {t.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t.date}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t.time}
              <button id="deleteButton" onClick={e => props.onDelete(t.id)}>
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default WalkList;
