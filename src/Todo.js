import { Button, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import db from './firebase';
import './Todo.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
}))

function Todo({todo}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const deleteButton = () => {
        db.collection('todos').doc(todo.id).delete();
    }

    const updateTodo = () => {
        // update the todo with new input text
        setOpen(false);
        db.collection('todos').doc(todo.id).set({
            todo: input
        }, {merge: true})
    }

    return (
        <>
            <Modal
            open={open}
            onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>I am Modal</h1>
                    <input placeholder={todo.todo} value={input} onChange={e => setInput(e.target.value)} />
                    <Button onClick={updateTodo}>Update Todo</Button>
                </div>
            </Modal>
            <List className='todo_list'>
                <ListItem>
                <ArrowRightAltIcon/>
                <ListItemText primary={todo.todo} />
                </ListItem>
                <button onClick={e => setOpen(true)}>Edit Me</button>
                <DeleteForeverIcon onClick={deleteButton} />
            </List>
        </>
    )
};

export default Todo;
