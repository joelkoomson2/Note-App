import React from 'react';
import Filter from '../components/Filter';
import NoteCardContainer from '../components/NoteCardContainer';

const HomePage = ({ notes, loading, filterText, handleFilterText }) => {
  return (
    <>
      <p>Current filter: {filterText}</p> {/* Display the current filter */}
      <Filter handleFilterText={handleFilterText} />
      <NoteCardContainer notes={notes} loading={loading} />
    </>
  );
};

export default HomePage;