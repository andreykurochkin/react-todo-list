import React, { useState } from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
import AddTodo from './Todo/AddTodo';

function App() {

    const [todos, setTodos] = React.useState([
        { id: 1, completed: true, description: 'Купить хлеб' },
        { id: 2, completed: false, description: 'Купить масло' },
        { id: 3, completed: false, description: 'Купить молоко' },
    ]);

    function toggleTodo(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
                return todo;
            })
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    function onCreate(title) {
        setTodos(todos.concat([{
            id: Date.now(),
            completed: false,
            description: title
        }]));
        console.log(todos);
    }

    return (
        <Context.Provider value={{ removeTodo: removeTodo }}>
            <div className='wrapper'>
                <h1>React tutorial</h1>
                <AddTodo onCreate={onCreate} />
                {(todos.length) ? <TodoList todos={todos} onToggle={toggleTodo} /> : <p>No content</p>}
            </div>
        </Context.Provider>
    );
}

export default App;
