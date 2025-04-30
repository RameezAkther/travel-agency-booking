import React, { useEffect, useState } from 'react';
import './Users.css';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (email) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter(user => user.email !== email);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Registered Users</h2>
      {users.length > 0 ? (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Sex</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.email}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.sex}</td>
                <td>{user.age}</td>
                <td>
                  {user.username === "admin" ? (
                    <span className="text-muted">Admin (protected)</span>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h5 className="text-center">No users found.</h5>
      )}
    </div>
  );
};

export default ViewAllUsers;
