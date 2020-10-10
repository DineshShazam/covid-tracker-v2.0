import React from 'react'
import './App.css'
import Table from './Components/CasesTable/Table.component'
import LineGraph from './Components/Charts/LineGraph/line.component'
import Header from './Components/Header/Header.component'
import CaseInfo from './Components/Information/info.component'
import Map from './Components/Map/Map.component'

import {Switch,Route} from 'react-router-dom'
import Vaccine from './Components/Vaccine/Vaccine.component'
import About from './Components/About/About.component'
import Footer from './Components/Footer/Footer.component'

const App = () => {

  return (
    <div className="app">
      <Switch>
          {/* left panel */}
          <div className='app__left'>

              <div className="app__header">
                <Header/>
              </div>

              <div className="app__stats">
                <Route exact path={['/','/country','/state']} component={CaseInfo}/>
              </div>

              <div className="app__map">
                <Route exact path={['/','/country','/state']} component={Map}/>
                <Route exact path='/vaccine' component={Vaccine} />
                <Route exact path='/about' component={About} />
              </div>

          </div>
      </Switch>
      {/* right panel */}
      <div className="app__right">
        <Table/>
        <br/>
        <LineGraph/>
      </div>

      <div className="app__bottom">
        <Footer/>
      </div>
    </div>
  )
}

export default App;