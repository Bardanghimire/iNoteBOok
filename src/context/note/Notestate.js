import NoteContext from "./noteContext";
import { useState } from 'react'
const NoteState = (props) => {
    const [alert, setAlert] = useState(null)
    const ShowAlert = (message, type) => {
        setTimeout(() => {
            setAlert({ message, type });
        }, 1500);
    }
    const host = "http://localhost:5000"
    const initialNote = []
    const [notes, setNotes] = useState(initialNote)

    //Get all notes
    const getNotes = async () => {
        try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);
    } catch (error) {
        console.log(error.message);
    }
    }
    //Add Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json()
        setNotes(notes.concat(json))
        ShowAlert("New Note successfully Added", "success")
        console.log(alert);
    }
    // Delete Note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        // const json = await response.json()
        // console.log(`The note with use id ${id} is deleted`)
        // Returns all element except the deleted one
        const newNote = notes.filter((note) => { return id !== note._id })
        // Settting the new Notes
        setNotes(newNote)
        ShowAlert("Note deleted sucessfully", "success")
        // Edit Note
    }
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = response.json()
        //Logic to Edit Notes
        notes.forEach((note) => {
            if (id === note._id) {
                note.title = title
                note.description = description
                note.tag = tag
            }
        })
    }
    return (
        <NoteContext.Provider value={{ notes, alert, addNote, setNotes, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState