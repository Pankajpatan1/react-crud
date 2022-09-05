import React from "react";

// Styles
import "./style.scss";

// Images
import SortIcon from "../../img/sort-icon.png";

const DataTable = props => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
            >
              <span className="column-sort">
                Title
                <img src={SortIcon} alt="First Name" />
              </span>
            </th>
            <th
            >
              <span className="column-sort">
                Content
                <img src={SortIcon} alt="Last Name" />
              </span>
            </th>
            <th
            >
              <span className="column-sort">
                Date
                <img src={SortIcon} alt="E-Mail" />
              </span>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length ? (
            props.users.map(user => (
              <tr key={user._id}>
                  <td className="field-avatar">
                </td>
                <td>{user.title}</td>
                <td>{user.content}</td>
                <td>{user.date}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(user);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No Record!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
