import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/note/noteContext';
import Noteitems from './Noteitems'
import AddNotes from './AddNotes';

function Note(props) {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "", id: "", search: "" })
    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes()
        }
        // eslint-disable-next-line
    })
    const ref = useRef(null)
    const updatenote = (Currentnote) => {
        ref.current.click();
        setNote({ etitle: Currentnote.title, edescription: Currentnote.description, etag: Currentnote.tag, id: Currentnote._id });
    }
    const handleClick = (event) => {
        event.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        props.showAlert("Note updated successfully", "success");
    }
    const onchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <AddNotes showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Your Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="container my-3">
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onchange} autoComplete="off" value={note.etitle} minLength={3} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} autoComplete="off" value={note.etag} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="edescription" name="edescription" rows="4" style={{ "resize": "none" }} onChange={onchange} value={note.edescription} minLength={3} required ></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark addNote" onClick={handleClick} data-bs-dismiss="modal" disabled={note.etitle.length <= 3 || note.edescription.length <= 3} >Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container my-4" >
                <div className="d-flex justify-content-between mx-3">
                    <div>
                        <h2>Your Note</h2>
                    </div>
                    <div className="search">
                        <input className="form-control me-2" type="search" placeholder="Search..." aria-label="Search" className="search-input" name="search" onChange={onchange}
                        /> <hr className="horizon" />
                    </div>
                </div>
                <div className="container my-3">
                    {notes.length === 0 && 'No notes to display'}
                    {notes.reverse().filter((not) => {
                        if (note.search) {
                            if (not.title.toLowerCase().includes(note.search.toLowerCase())) return true
                            else if ((not.tag.toLowerCase().includes(note.search.toLowerCase()))) return true
                            else if ((not.description.toLowerCase().includes(note.search.toLowerCase()))) return true;
                        }
                        else { return true }
                    }).map((note) => {
                        return <Noteitems note={note} key={note._id} updatenote={updatenote} showAlert={props.showAlert} />
                    })
                    }
                </div >
            </div>
        </>
    )
}

export default Note
