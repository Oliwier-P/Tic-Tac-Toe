import React from 'react'
import {Link} from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div className='title-gamemode'>
        <span className='color-t'>Tic</span>-Tac-<span className='color-t'>Toe</span>
      </div>
      <div className='gamemode'>
        <Link className='link-gamemode' to="/singleplayer"><button className='btn-gamemode' >Singleplayer</button></Link>
        <Link className='link-gamemode' to="/multiplayer"><button className='btn-gamemode' >Multiplayer</button></Link>
      </div>
    </>
  )
}
