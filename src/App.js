import React, { useEffect } from 'react';
import TodoList from './Todo/TodoList';
import Context from './context';
import Loader from './Todo/Loader';

// import AddTodo from './Todo/AddTodo';


const AddTodo = React.lazy(
    () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(import('./Todo/AddTodo'))
        }, 2000)
    })
);
// new Promise(resolve => {
//     resolve((setTimeout(() => import('./Todo/AddTodo'), 2000))
// });

function App() {

    const [todos, setTodos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


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
            title: title
        }]));
        console.log(todos);
    }

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(response => response.json())
            .then(todos => {
                setTimeout(() => {
                    setTodos(todos);
                    setLoading(false);
                }, 2000);
            });
    }, []);

    return (
        <Context.Provider value={{ removeTodo: removeTodo }}>
            <div className='wrapper'>
                <h1>React tutorial</h1>
                <React.Suspense fallback={<p>Loading...</p>}>
                    <AddTodo onCreate={onCreate} />
                </React.Suspense>
                {loading && <Loader />}
                {(todos.length)
                    ? (<TodoList todos={todos} onToggle={toggleTodo} />)
                    : (loading ? null : <p>No content</p>)}
            </div>
        </Context.Provider>
    );
}

export default App;
