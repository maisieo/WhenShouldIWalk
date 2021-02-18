import React from "react";
import Table from "react-bootstrap/Table";

function WalkList(props) {
  return (
    <div className="WalkList">
      <h2>My walks</h2>

      <ul>
        {props.walks.map(w => (
          <li key={w.id} className="list-items">
            {w.title} on {w.date} at {w.time}
            <button id="deleteButton" onClick={e => props.onDelete(w.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WalkList;
