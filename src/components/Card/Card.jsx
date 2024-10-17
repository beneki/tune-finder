import { useState } from 'react'
import './Card.css'

function Card({ artistName, trackName, album, albumImg }) {

    return (
        <div className='track'>
            <img src={albumImg} />
            <p>Song: {artistName}</p>
            <p>Artist: {trackName}</p>
            <p>Album: {album}</p>
        </div>
    )
}

export default Card
