import React from "react";
import Table from "react-bootstrap/Table";

function WalkList(props) {
  // columns necessary in order to sort the information into rows rather than columns
  let info = props.walks[0] && Object.keys(props.walks[0]);
  return (
    <Table borderless hover striped responsive="sm">
      <thead>
        <tr>
          <td>#</td>
          <th>Title</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {/* //maps the walks information */}
        {props.walks.map(row => (
          <tr key={row.id}>
            {/* //maps the walk info into columns */}
            {info.map(e => (
              <td key={row.id}>{row[e]}</td>
            ))}
            <td>
              <button
                id="deleteButton"
                onClick={() => props.onDelete(props.walks[0].id)}
              >
                Delete{" "}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WalkList;
