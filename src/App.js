import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import db from './firebase';
import Todo from './Todo';
import firebase from 'firebase';

const App = () =>{
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // this code here fires when app loads
    db.collection('todos').orderBy('timeStamp', 'desc').onSnapshot(snapShot => (
      setTodos(snapShot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    ))
  },[])

  const handleChange = event => {
    setInput(event.target.value)
  };

  const addTodos = (event) => {
    event.preventDefault();
    db.collection('todos').add({
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    setInput('');
  };

  return (
    <div className="App">
      <h1>Hello People🚀</h1>
      <form>
        <FormControl>
          <InputLabel>✔️Write a Todo</InputLabel>
          <Input value={input} onChange={handleChange} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={addTodos} >
          Add todos
        </Button>
      </form>

      <ul>
        {
          todos.map(todo => 
            <Todo key={todo.id} todo={todo} />  
          )
        }
      </ul>
    </div>
  );
}

export default App;
