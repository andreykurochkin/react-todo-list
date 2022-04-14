import React, { useState } from 'react';
import PropTypes from 'prop-types';

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
};

function useInputValue(defautlValue='') {
    const [value, setValue] = useState(defautlValue);
    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        value: () => value,
        clear: () => setValue('')
    }
}

function AddTodo({onCreate}) {
    const input = useInputValue('');
    
    function handleSubmit(event) {
        event.preventDefault();
        if (input.value().trim()) {
            onCreate(input.value());
        }
        input.clear();
    }

    return (
        <form style = {{marginBottom: '1rem'}} onSubmit = {(event) => handleSubmit(event)}>
            <input {...input.bind} />
            <button type="submit">Add Todo</button>
        </form>
    );
}

export default AddTodo