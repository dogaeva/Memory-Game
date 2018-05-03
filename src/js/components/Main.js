import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from './App.js'
import StartPage from './StartPage.js'
import EndPage from './EndPage.js'


const Main = () => (
    <main>
      <Switch>
        <Route exact path='/' component={StartPage}/>
        <Route path='/app' component={App}/>
        <Route path="/endpage/:score"
        render={({match}) => <EndPage value={match.params.score} />} />
      </Switch>
    </main>
  )
  
  export default Main