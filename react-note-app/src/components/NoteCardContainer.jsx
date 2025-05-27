import React from 'react'
import NoteCard from './NoteCard'

const NoteCardContainer = ({notes}) => {
  console.log('NoteCardContainer notes:', notes); // Debug: log notes prop
  return (
    <div className="container">
    <div className="note-has-grid row">
      <h4>Note card container </h4>
      {notes.map(note => <NoteCard key={note.id} note={note} />)}
    </div>
    </div>

  )
}

export default NoteCardContainer