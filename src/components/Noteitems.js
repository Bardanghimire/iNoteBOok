import React, { useState, useContext } from 'react'
import noteContext from '../context/note/noteContext';


function Noteitems(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updatenote } = props
    let myStyle = {
        fontSize: "1.2rem"
    }
    const [style, setStyle] = useState(myStyle)
    const [style1, setStyle1] = useState(myStyle)


    const handleDelete = (note) => {
        // console.log(note._id)
        deleteNote(note._id)
    }

    // const [time, setTime] = useState(null)
    const handleDate = (date) => {
        //gettig a new date
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        // const date = new Date(note.date);
        const dateTime = new Date();
        if ((dateTime.getMinutes() - date.getMinutes()) < 1 && (dateTime.getHours() - date.getHours()) < 1 && (dateTime.getDate() - date.getDate()) < 1 && (dateTime.getMonth() - date.getMonth()) < 1 && (dateTime.getFullYear() - date.getFullYear()) < 1 && (dateTime.getSeconds() - date.getSeconds()) <= 60) {
            // returns on the bases of seconds
            return (dateTime.getSeconds() - date.getSeconds()) + " sec ago"
        }
        else if ((dateTime.getHours() - date.getHours()) < 1 && (dateTime.getDate() - date.getDate()) < 1 && (dateTime.getMonth() - date.getMonth()) < 1 && (dateTime.getFullYear() - date.getFullYear()) < 1 && (dateTime.getMinutes() - date.getMinutes()) <= 60) {
            // returns on the bases of minutes
            return (dateTime.getMinutes() - date.getMinutes()) + " min ago"
        }
        else if ((dateTime.getDate() - date.getDate()) < 1 && (dateTime.getMonth() - date.getMonth()) < 1 && (dateTime.getFullYear() - date.getFullYear()) < 1 && (dateTime.getHours() - date.getHours()) >= 1) {
            // returns on bases of hours
            return (dateTime.getHours() - date.getHours()) + " hours ago"
        }
        else if ((dateTime.getMonth() - date.getMonth()) < 1 && (dateTime.getFullYear() - date.getFullYear()) < 1 && (dateTime.getDate() - date.getDate()) >= 1) {
            // setTime({ month: date?true: false })
            return "On " + (date.getDate() + " " + monthNames[date.getMonth()])
        }
        else return " "
    }
    const cap = (word) => {
        let string = word.toLowerCase();
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <div className="container my-2">
            <div className="card my-2 border-dark rounded">
                <div className="card-body">
                    <h4 className="card-title my-0">{note.title}</h4>
                    {/* <h6 className="card-subtitle mb-2 text-muted"></h6> */}
                    <small className="opacity-75 my-1">{`${handleDate(new Date(note.date))}`}</small>
                    <h6 className="card-subtitle my-0 opacity-75">{cap(note.tag === "" ? "" : note.tag)}</h6>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-end ">
                        <div className="Delete mx-2">
                            <button className="button-delete" onMouseOver={() => setStyle({ fontSize: "1.26rem" })} onMouseOut={() => setStyle({ fontSize: "1.2rem" })} onClick={() => { handleDelete(note); props.showAlert("Note Deleted successfully","success") }}>
                                <i className="fas fa-trash mx-1" style={style}></i>
                                <span className="delete" >delete</span>
                            </button>
                        </div>
                        <div className="Edit mx-2">
                            <button onClick={() => { updatenote(note) }} className="button-edit" onMouseOver={() => setStyle1({ fontSize: "1.26rem" })} onMouseOut={() => setStyle1({ fontSize: "1.2rem" })}>
                                <i className="fas fa-edit mx-1" style={style1}></i>
                                <span className="edit">edit</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
