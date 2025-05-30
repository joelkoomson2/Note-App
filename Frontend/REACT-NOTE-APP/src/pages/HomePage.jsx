import React from 'react'
import Filter from '../components/Filter'
// import NoteCard from './components/NoteCard'
import NoteCardContainer from '../components/NoteCardContainer'
const HomePage = ({notes, loading}) => {
  return (
    <>
    <Filter/>
    <NoteCardContainer notes={notes} loading = {loading}/>
    </>
  )
}

export default HomePage