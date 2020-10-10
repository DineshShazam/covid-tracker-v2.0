import React,{useState,useEffect} from 'react'
import './Header.css'
import {NavLink,withRouter} from 'react-router-dom'
import logo from './logo.ico'
import axios from 'axios'

import {FormControl,Select,MenuItem} from '@material-ui/core'

const Header = ({location}) => {

    // get woldwide dropdown
    const [countries,setCountries] = useState([]);
    // set Countries
    const [country,setCountry] = useState('worldwide');

    // get govCountry dropdown
    const [govCountries,setGovCountries] = useState([]);
    // set govCountry
    const [govCountry,setGovCountry] = useState('Countries');

    // get State dropdown
    const [govState,setGovState] = useState([]);
    // set state
    const [stateValue,setStateValue] = useState('State');

    useEffect(() => {

        // countries dropdown
        axios.get('https://disease.sh/v3/covid-19/countries').then(({data}) => {
            const country = data.map(({country,countryInfo}) => ({
                name:country,
                value:countryInfo.iso2
            }))
            console.log(country)
            setCountries(country)
        }).catch(err => console.log(`error at get countries dropdown, ${err}`));
    },[])

    useEffect(() => {
        axios.get('https://disease.sh/v3/covid-19/gov/').then(({data}) => {
            console.log(data);
            setGovCountries(data);
        }).catch((err) => {
            console.log(`error at government countries, ${err}`);
        })
    },[])

    const countryChange = (e) => {
        const value = e.target.value;
        setCountry(value);
        
        // send the data to the state
        
    }

    const govCountryChange = (e) => {
        const value = e.target.value
        console.log(value);
        setGovCountry(value);
        

        if(value === 'Countries')
        {
            // show please select the countries
        } else if(value === 'India') {
            axios.get(`https://disease.sh/v3/covid-19/gov/${value}`).then(({data}) => {
                const {states} = data
                console.log(states);
                setGovState(states);
            }).catch(err => console.log(`error at state countries, ${err}`));
        } else {
            alert('Data available only for India');
            setGovCountry('Countries')
        }
    }

    const govStateChange = (e) => {
        const value = e.target.value;
        setStateValue(value);
    }
    return (
        <div>
        <div className="nav-bar">
        <div className="nav-container">
          <div className="brand">
           <img src={logo} alt='SDK_LOGO'/>
          </div>
          <nav>
            <div className="nav-mobile"><a id="nav-toggle" href="#!"><span></span></a></div>
            <ul className="nav-list">
              <li>
                <NavLink 
                exact
                activeClassName='navbar--active'
                to='/country'
                >Country
                </NavLink>
              </li>
              <li>
                <NavLink 
                    exact
                    activeClassName='navbar--active'
                    to='/state'
                    >state
                </NavLink>
              </li>
              <li>
                    <NavLink 
                        exact
                        activeClassName='navbar--active'
                        to='/vaccine'
                        >vaccine
                    </NavLink>
              </li>
              <li>
                    <NavLink 
                        exact
                        activeClassName='navbar--active'
                        to='/about'
                        >About
                    </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    <br/>
        {
            location.pathname === '/country' ? 

            (<FormControl className="app__dropdown">
                <Select variant='outlined' value={country} onChange={countryChange}>
                    <MenuItem value='worldwide'>worlwide</MenuItem>
                    {
                        countries.map(({name,value}) => (
                            <MenuItem value={value}>{name}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>)
            : 
            location.pathname === '/state' ?

            (<FormControl className="app__dropdown__state">
                <Select variant='outlined' value={govCountry} onChange={govCountryChange}>
                    <MenuItem value="Countries">Countries</MenuItem>
                    {
                        govCountries.map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))
                    }
                </Select>

                <Select variant='outlined' value={stateValue} onChange={govStateChange}>
                    <MenuItem value="State">State</MenuItem>
                    {
                        govState.map(({state}) => (
                            <MenuItem value={state}>{state}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>)
            :
            <div></div>
        }
    </div>
    )
}

export default withRouter(Header) 