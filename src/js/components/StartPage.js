import React from 'react'
import { Link } from 'react-router-dom'


const StartPage = () => (
  <div className="b-start-game" data-tid="App">
     <img src="./img/Group_2.png"/> 
     <div className="b-start-name">
     <p className="h1">MEMORY GAME </p>
     </div>
     <Link to='/app'><button type="button" className="btn btn-light btn-lg b-btn-start " data-tid="NewGame-startGame"><h1>Начать игру</h1></button></Link>
  </div>
)

export default StartPage