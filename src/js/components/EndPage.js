import React from 'react'
import { Link } from 'react-router-dom'


const EndPage = (score) => (


<div className="b-end-game">
<img src="../img/Group_1.png"/> 
<div className="b-end-score">
<p className="h2">Поздравляем!</p>
<p className="h2">Ваш итоговый счет: {score.value}</p>
     </div>
<Link to='/app'><button type="button" className="btn btn-light btn-lg b-btn-end " data-tid="EndGame-retryGame"><h2>Еще раз</h2></button></Link>
</div>
)

export default EndPage