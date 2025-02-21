import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch } from 'react-router-dom'
//import 'bootstrap/dist/css/bootstrap.min.css'
//import Routes from './routes'
import App from './App'

//ReactDOM.render(<App />, document.getElementById('root'))

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)
