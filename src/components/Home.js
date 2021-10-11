import React from 'react'
// import noteContext from '../context/note/noteContext';
import Note from './Note';
export default function Home(props) {
    const { showAlert } = props

    return (
        <>
            <Note showAlert={showAlert} />
        </>
    )
}
