import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <footer className="py-5 bg-light">
        <div className="container">
          <p className="m-0 text-center">&copy; 2018 ANS Grace Shopper</p>
        </div>
      </footer>
    </div>
  )
}

export default App
