import React, { Component } from 'react';
import Card from './Card.js';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super()
    this.map = null
    this.firstSym = ['0','2','3','4','5','6','7','8','9','J','K','Q','A']
    this.secondSym = ['C','D','H','S']

    this.cardArr = (firstSym, secondSym) => {
      let arr = []
      for(let i=0;i<9;i++){
        let k = i
        let rand = Math.floor(Math.random()*17)
        let num = firstSym[Math.floor(Math.random()*firstSym.length)]+secondSym[Math.floor(Math.random()*secondSym.length)]
        
        for(let l=0;l<=i;l++){
          if(arr[l] === num) {
            num = firstSym[Math.floor(Math.random()*firstSym.length)]+secondSym[Math.floor(Math.random()*secondSym.length)],
            l=0;
          }
        }
    
        arr[k]=num
        arr[9+k]=num
      
      }
      arr = arr.sort(function() {return 0.5 - Math.random()})
      return arr.map((val, i) => ({clicked: false,
        value: val,
        front: './img/'+val+'.png',
        id: i,
        deleted: '',
        tid: 'Card-flipped'
        }))
    }




    this.state = {
      cards: this.cardArr(this.firstSym, this.secondSym),
      clickable: 'disable',
      pairs: 9,
      score: 0,
      link: ''    
    }

}


componentDidMount() {
  this.turningCards = setTimeout(function () {
    this.setState({...this.state,
      clickable: 'b-card',
      cards: this.state.cards.map(card => {card.front = './img/back.png',
      card.tid = 'Card'
      return card 
     })
    })
  }.bind(this), 5000)
}


handleRestartClick(event){
  event.preventDefault();

  clearInterval(this.turningCards)

 this.setState({
    cards: this.cardArr(this.firstSym, this.secondSym),
    clickable: 'disable',
    pairs: 9,
    score: 0,
    link: ''
  })

  this.turningCards = setTimeout(function () {
    this.setState({...this.state,
      clickable: 'b-card',
      cards: this.state.cards.map(card => {card.front = './img/back.png',
      card.tid = 'Card'
      return card 
     })
    })
  }.bind(this), 5000)

}

handleClick(id, event){


event.preventDefault();

let clickedCards = this.state.cards.filter((card) => (card.clicked === true))
let newCard = null
let disableClick = "disable"

if(clickedCards.length<2){
newCard = this.state.cards.map(card => {if((card.id === id)&&(card.clicked === false)) {
    card.clicked = true,
    card.front = './img/'+card.value+'.png',
    card.tid = 'Card-flipped'
    clickedCards = [...clickedCards, card]
  }
  return card 
}
)
}

switch (clickedCards.length){
  case 1:{
    this.setState({
      ...this.state,
      cards: newCard,
      clickable: 'b-card'
    })
    break;
  }

  case 2:{
    this.setState({
      ...this.state,
      cards: newCard,
      clickable: 'disable'
    })


    setTimeout(function () {
      this.setState({...this.state,
        clickable: 'b-card',
        cards: getCards(clickedCards, newCard),
        score: getPoints(clickedCards, this.state.pairs, this.state.score),
        pairs: getPairs(clickedCards, this.state.pairs),
        link: getLink(getPairs(clickedCards, this.state.pairs), getPoints(clickedCards, this.state.pairs, this.state.score))
      })
    }.bind(this), 2000)
    break;
  }
}


const getCards = ((clickedCards, cards) =>{

 if (clickedCards[0].value === clickedCards[1].value){
  cards = cards.map(card => {if(card.clicked === true){
    card.deleted='hide'
    card.clicked=false
    card.tid=''
  } 
return card
})} else {
  cards = cards.map(card => {if(card.clicked === true){
      card.clicked = false,
      card.front = './img/back.png',
      card.tid = 'Card'
    } 
  return card
  }
)}
return cards
})


const getPoints = ((clickedCards, pairs, score) =>{
  if (clickedCards[0].value === clickedCards[1].value){
    return score+(pairs*42)
  } else {
    return score-((9-pairs)*42)
  }

})

const getPairs = ((clickedCards, pairs) =>{
  if (clickedCards[0].value === clickedCards[1].value){
    return pairs = pairs-1
  } 
return pairs
})


const getLink = ((pairs, score) =>{
  let link = ''
  let scoreLink = '/endpage/'+score
  if (pairs === 0){
    return link = <Redirect to={scoreLink}/>
  }
  return link
})

}



  render() {
    
    return (
  <div>  

    <div className="b-header" >
      <div className="b-restart" onClick={this.handleRestartClick.bind(this)} >
      <button type="button" className="btn btn-restart" data-tid="Menu-newGame"><h3>Начать заново</h3></button>
      </div>

      <div className="b-score" >
       <div className="b-numbers" data-tid="Menu-scores">
         <h3>{this.state.score}</h3>
       </div>

       <div className="b-numbers" >
         <h3>Очки:</h3>
       </div>
      </div>
    </div>


   <div className="b-main" data-tid="Deck" >

     {this.state.cards.map((card, i) => 


     <Card src={card.front} 
     onClick={this.handleClick.bind(this, card.id)} 
     clicked={card.clicked} 
     key={i} 
     hide={card.deleted} 
     clickable={this.state.clickable}
     tid={card.tid}
     />
     )}
        <div>
       {this.state.link}    
       </div>
    </div>
    </div>

    );
  }
}

export default App;
