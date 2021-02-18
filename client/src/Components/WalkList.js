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
          <tr>
            {columns.map(column => (
              <td>{row[column]}</td>
            ))}
            <td>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default WalkList;
