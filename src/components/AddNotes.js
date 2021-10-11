import React, { useContext, useState } from 'react'
import noteContext from '../context/note/noteContext';

const AddNotes = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (event) => {
        event.preventDefault();
        addNote(note.title, note.description, note.tag)
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note Added succefully", "success");
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-2">
                <h2>Add Your Notes</h2>
                <form className="container my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onchange} autoComplete="off" required minLength={3} value={note.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onchange} autoComplete="off" required value={note.tag} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="4" style={{ "resize": "none" }} onChange={onchange} required minLength={3} value={note.description}></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-dark addNote" onClick={handleClick} disabled={note.title.length <= 3 || note.description.length <= 3}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
export default AddNotes
