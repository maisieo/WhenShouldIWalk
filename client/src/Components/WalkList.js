import React from "react";
import Table from "react-bootstrap/Table";

function WalkList(props) {
  let columns = props.walks[0] && Object.keys(props.walks[0]);
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
        {props.walks.map(row => (
          <tr key={row.id}>
            {columns.map(e => (
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
