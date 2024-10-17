import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar/SeachBar'
import Card from './components/Card/Card'

function App() {
  const [isResultready, setResultReady] = useState(false)
  const [res, setRes] = useState([])
  const toggleResult = (res) => {
    console.log('toggled')
    setResultReady(prev => !prev)
    setRes(res)
  }

  return (
    <>
      {
        isResultready
          ? res.map(({ trackId, artistName, trackName, collectionName, artworkUrl100 }) =>
            <Card
              key={trackId}
              artistName={artistName}
              trackName={trackName}
              album={collectionName}
              albumImg={artworkUrl100}
            />
          )
          : <SearchBar toggleResult={toggleResult} />
      }

    </>
  )
}

export default App
