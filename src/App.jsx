import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components';



function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/music" element={<MusicList />} />
        <Route path="/music/:id" element={<MusicDetail />} />
      </Routes>
    </Router>
  )
}

export default App
