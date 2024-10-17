import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ toggleResult }) {
  const [searchTxt, setSearchTxt] = useState('')

  const search = async (e) => {
    e.preventDefault();
    console.log('request')
    let finSearchTxt = searchTxt;
    if (finSearchTxt) {
      // validating: TO-DO
      finSearchTxt = finSearchTxt.trim();
    }

    const result = await fetch(`https://itunes.apple.com/search?term=${finSearchTxt}`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    const jsonRes = await result.json();
    console.log(jsonRes.results);

    if (jsonRes.results && jsonRes.results.length > 0) {
      toggleResult(jsonRes.results)
    }

  }

  return (
    <nav className='navbar'>
      <form className='search-bar' onSubmit={search}>
        <input type="text" value={searchTxt} onChange={(e) => setSearchTxt(e.target.value)} placeholder='Serch your music' />
        <button type='submit'> Search </button>
      </form>
    </nav>
  )
}

export default SearchBar
