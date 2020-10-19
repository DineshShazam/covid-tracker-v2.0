import React,{useState,useEffect} from 'react'
import './Header.css'
import {NavLink,withRouter} from 'react-router-dom'
import logo from './logo.ico'
import axios from 'axios'

import {FormControl,Select,MenuItem} from '@material-ui/core'
import { useStateValue } from '../../Hooks/state'

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


    // state
    const [state,dispatch] = useStateValue();

    useEffect(() => {

        // countries dropdown
        axios.get('https://disease.sh/v3/covid-19/countries').then(({data}) => {
            dispatch({
                type:'ADD_MAP_DATA',
                payload:data
            })
            const country = data.map(({country,countryInfo}) => ({
                name:country,
                value:countryInfo.iso2
            }))
            console.log(country)
            setCountries(country)
        }).catch(err => console.log(`error at get countries dropdown, ${err}`));
    },[])

    // countries dropdown 
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
        
        // send the data to the stateManagement
        dispatch({
            type:'ADD_COUNTRY_DATA',
            payload:value
        })
        
    }

    // state change
    const govCountryChange = (e) => {
        const value = e.target.value
        console.log(value);
        setGovCountry(value);

        if(value === 'Countries') {
            alert('please select the countries');
            
        } else {
            axios.get(`https://disease.sh/v3/covid-19/gov/${value}`).then(({data}) => {
                console.log(data);
                dispatch({
                    type:'ADD_INFO_CASES',
                    payload: data
                })

                // if(value === 'India') {
                //     const {states} = data;
                //     setGovState(states);
                // } else {
                //     setGovState(data);
                // }

                setGovState(data);
               
                // send the state data to Reducer
                dispatch({
                    type:'ADD_GOVCOUNTRY_DATA',
                    payload:value
                })
            }).catch(err => console.log(`error at gov change API, ${err}`))
        }
    }

    const govStateChange = (e) => {
        const value = e.target.value;
        setStateValue(value);
        dispatch({ 
            type:'ADD_STATE_DATA', 
            payload:value 
        })
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
                        govCountries?.map((value) => (
                            <MenuItem value={value}>{value}</MenuItem>
                        ))
                    }
                </Select>

                <Select variant='outlined' value={stateValue} onChange={govStateChange}>
                    <MenuItem value="State">State</MenuItem>
                    {

                        govCountry === 'India' ? (
                                govState?.map(({state}) => (
                                    <MenuItem value={state}>{state}</MenuItem>
                                ))
                        ) : (
                                govState?.map(({province}) => (
                                    <MenuItem value={province}>{province}</MenuItem>
                                ))
                        )
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