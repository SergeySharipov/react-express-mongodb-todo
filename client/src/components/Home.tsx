import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import UpdateTodoDialog from './UpdateTodoDialog'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todo.service'
import { getCurrentUser } from "../services/auth.service";
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [editTodoId, setEditTodoId] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      setCurrentUserId(user.id)
    }
  }, [])

  useEffect(() => {
    function fetchTodos() {
      if (currentUserId) {
        getTodos(currentUserId)
          .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
          .catch((err: Error) => console.log(err))
      }
    }
    if (currentUserId !== null) {
      fetchTodos()
    }
  }, [currentUserId])

  const handleSaveTodo
    = (formData: AddTodoFormData): void => {
      if (currentUserId) {
        addTodo(currentUserId, formData)
          .then(({ status, data }) => {
            if (status !== 201) {
              throw new Error('Error! Todo not saved')
            }
            setTodos(data.todos)
          })
          .catch((err) => console.log(err))
      }
    }

  const handleUpdateTodo = (todo: ITodo): void => {
    cancelEditDialog()
    if (currentUserId) {
      updateTodo(currentUserId, todo)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todo not updated')
          }
          setTodos(data.todos)
        })
        .catch((err) => console.log(err))
    }
  }

  const handleDeleteTodo = (_id: string): void => {
    if (currentUserId) {
      deleteTodo(currentUserId, _id)
        .then(({ status, data }) => {
          if (status !== 200) {
            throw new Error('Error! Todo not deleted')
          }
          setTodos(data.todos)
        })
        .catch((err) => console.log(err))
    }
  }

  function handleOpenEditDialog(_id: string) {
    setEditTodoId(_id);
  }

  function cancelEditDialog() {
    if (editTodoId !== "") {
      setEditTodoId("")
    }
  }

  return (
    <div className="container">
      {!currentUserId && <div className='unauthorised'>
        <div className="col-md-12">
          <div className="card card-container">
            <h1>Welcome</h1>
            <div className="form-group">
              <Link to={"/login"} className="btn btn-primary btn-block">
                Login
              </Link>
              <h3>Or</h3>
              <Link to={"/register"} className="btn btn-secondary btn-block">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>}
      {currentUserId && <div className='todoApp'>
        <h1>My Todos</h1>
        <AddTodo saveTodo={handleSaveTodo} />
        {todos.map((todo: ITodo) => (
          <TodoItem
            key={todo._id}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}
            openEditDialog={handleOpenEditDialog}
            todo={todo}
          />
        ))}
        <UpdateTodoDialog
          todo={
            editTodoId !== ""
              ? todos.find(todo => todo._id === editTodoId)
              : undefined
          }
          updateTodo={handleUpdateTodo}
          cancelEditDialog={cancelEditDialog}
        />
      </div>}
    </div>
  )
}

export default Home