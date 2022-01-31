import React from "react"

type Props = TodoProps & {
  updateTodo: (todo: ITodo) => void
  deleteTodo: (_id: string) => void
}

const Todo: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const checkTodo: string = todo.status ? `line-through` : ""
  return (
    <div className="Card">
      <div className="Card--checkbox_container"
        onClick={() => updateTodo(todo)}>
        <input
          className="Card--checkbox"
          type="checkbox"
          readOnly
          checked={todo.status}
        />
        <span className="Card--checkbox_checkmark"/>
      </div>
      <div className="Card--text">
        <h2 className={checkTodo}>{todo.name}</h2>
        <span className={checkTodo}>{todo.description}</span>
      </div>
      <div className="Card--button">
        <button
          onClick={() => deleteTodo(todo._id)}
          className="Card--button__delete"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default Todo