import React, { useState, useEffect } from 'react';
import  db  from '../Firebase'; 
import "../Todoapp/Todo.css";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

const Todo = () => {
  const [input, setInput] = useState(""); 
  const [todos, setTodos] = useState([]); 
  const [isEditing, setIsEditing] = useState(false); 
  const [currentTodoId, setCurrentTodoId] = useState(null); 

  
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todosCollection = collection(db, "todos");
        const querySnapshot = await getDocs(todosCollection);
        const todosArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTodos(todosArray);
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      try {
        if (isEditing) {

            const todoDoc = doc(db, "todos", currentTodoId);
          await updateDoc(todoDoc, { text: input });
          setTodos(todos.map(todo => 
            todo.id === currentTodoId ? { ...todo, text: input } : todo
          ));
          setIsEditing(false);
          setCurrentTodoId(null);
        } else {
          const docRef = await addDoc(collection(db, "todos"), {
            text: input,
          });
          setTodos([...todos, { id: docRef.id, text: input }]);
        }
        setInput(""); 
      } catch (error) {
        console.error("Error adding/updating todo: ", error);
      }
    }
  };

  // Handle deleting a todo
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleEdit = (id, currentText) => {
    const newTodo = prompt("Enter the new value for the todo:", currentText); 
    if (newTodo !== null && newTodo.trim() !== "") {
      const updateTodo = async () => {
        try {
          const todoDoc = doc(db, "todos", id);
          await updateDoc(todoDoc, { text: newTodo });
          setTodos(todos.map(todo => 
            todo.id === id ? { ...todo, text: newTodo } : todo
          ));
        } catch (error) {
          console.error("Error updating todo: ", error);
        }
      };
      updateTodo();
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter a todo"
        />
        <button type="submit">{isEditing ? "Update" : "Submit"}</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span className="todo-text">{todo.text}</span>
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => handleEdit(todo.id, todo.text)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
