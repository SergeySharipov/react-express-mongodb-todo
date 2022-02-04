import React from "react";
import { getCurrentUser } from "../services/auth.service";
import { deleteAllTodos } from '../services/todo.service'

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  const handleDeleteTodos = (): void => {
    if (currentUser.id) {
      deleteAllTodos(currentUser.id)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todos are not deleted')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h1>
          Profile
        </h1>
        <p>
          <strong>Username:</strong> {currentUser.username}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <button className="btn btn-danger btn-block" onClick={handleDeleteTodos}>
          <span>Delete All Todos</span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
