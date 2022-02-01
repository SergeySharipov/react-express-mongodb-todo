import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import UpdateTodoDialog from './components/UpdateTodoDialog'
import { getTodos, addTodo, updateTodo, deleteTodo } from './API'


const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])
  const [editTodoId, setEditTodoId] = useState("");

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error('Error! Todo not saved')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo): void => {
    cancelEditDialog()

    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
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
    <main className='App'>
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
    </main>
  )
}

export default App