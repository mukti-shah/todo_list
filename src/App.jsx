import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {


  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  function persistData(newlist){
    localStorage.setItem('todos', JSON.stringify({todos: newlist}))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodos(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodos(index)
  }

  useEffect(()=>{
    if (!localStorage){
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos){
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])

  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue}/>
      <TodoList todos={todos} handleDeleteTodos={handleDeleteTodos} handleEditTodos={handleEditTodos}/>
    </>
  )
}

export default App
