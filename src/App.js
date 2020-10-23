import React from 'react'
import './App.css'
import Table from './Components/CasesTable/Table.component'
import LineGraph from './Components/Charts/LineGraph/line.component'
import Header from './Components/Header/Header.component'
import CaseInfo from './Components/Information/info.component'
import MapInfo from './Components/Map/Map.component'

import {Switch,Route,Redirect} from 'react-router-dom'
import Vaccine from './Components/Vaccine/Vaccine.component'
import About from './Components/About/About.component'
import { CardContent } from '@material-ui/core'

import "leaflet/dist/leaflet.css";
// import Footer from './Components/Footer/Footer.component'

const App = () => {

  return (
    // <React.Fragment>
    <div className="app">
      <Switch>
      <Redirect exact from='/' to='/country' />
          {/* left panel */}
          <div className='app__left'>

              <div className="app__header">
                <Header/>
              </div>

              <div >
                <Route exact path={['/','/country','/state']} component={CaseInfo}/>
              </div>

              <div className="app__map">
                <Route exact path={['/','/country','/state']} component={MapInfo}/>
                <Route exact path='/vaccine' component={Vaccine} />
                <Route exact path='/about' component={About} />
              </div>
          </div>
          
      </Switch>
      {/* right panel */}
      <CardContent className="app__right">
      <h2>Live Cases by Country</h2>
        <Table/>
        <br/>
        <h2>WorldWide new Cases</h2>
        <LineGraph className="app__graph"/>
     
      </CardContent>

    </div>
    // <Footer/>
    // </React.Fragment>
  )
}

export default App;