import React,{useEffect,useState} from 'react'
import './info.css'
import InfoSplit from './info-split/info_split.component'
import { useStateValue } from '../../Hooks/state'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import { roundingCounts } from '../../Utils/utils'


const CaseInfo = ({location}) => {

    const [{Country,GovCountry,infoCases,GovState,caseType},dispatch] = useStateValue();
    // worldwide
    const [caseInfo,setCaseInfo] = useState({});
    // state
    const [stateInfo,setStateInfo] = useState({});

    // worldWide dropdown
    useEffect(() => {
        // send country location to the reducer
        const url = Country === 'worldwide' ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${Country}`;
        if(Country === 'worldwide'){
            dispatch({
                type:'ADD_MAP_LOCATION',
                payload : {center :{ lat: 34.80746, lng: -40.4796 }, zoom : 2}
            }) 
        }
        axios.get(url,{crossdomain: true}).then(({data}) => {
            setCaseInfo(data);
            dispatch({
                type:'ADD_MAP_LOCATION',
                payload : {center :[data.countryInfo.lat,data.countryInfo.long],zoom:4}
            })
        }).catch(err => console.log(`Error at infoBox WorldWide,${err}`));
    },[Country])

    // GovCountries dropdown
    useEffect(() => {
        // send the gov countries to the reducer
        const {total} = infoCases; 
        setStateInfo(total);
    },[GovCountry])

    // state dropdown
    useEffect(() => {

        // if(GovCountry === 'India') {
            const {states} = infoCases;
            const value = states?.find(data => data.state === GovState);
            setStateInfo(value);
        // } else {
        //      const {provinces} = infoCases;
        //     // const value = infoCases?.find(data => data.province === GovState);
        //     // console.log(value);
        //     // setStateInfo(value);
        // }

    },[GovState])

    // send the caseType to the reducer
    const caseTypes = (value) => { 
        dispatch({
            type:'ADD_CASE_TYPE',
            payload:value
        })
    }

    return ( 
      
        <div className="app__stats">
            {
                location.pathname === '/country' ? 
                (
                    <React.Fragment>
                        <InfoSplit onClick={e => caseTypes('cases')} isRed active={caseType === 'cases'} title='Covid-19 Cases' cases={roundingCounts(caseInfo.todayCases)} total={roundingCounts(caseInfo.active)}/>

                        <InfoSplit onClick={e => caseTypes('recovered')} active={caseType === 'recovered'} title='Recovered People' cases={roundingCounts(caseInfo.todayRecovered)} total={roundingCounts(caseInfo.recovered)}/>

                        <InfoSplit onClick={e => caseTypes('deaths')} isRed active={caseType === 'deaths'} title='Deaths' cases={roundingCounts(caseInfo.todayDeaths)} total={roundingCounts(caseInfo.deaths)}/>
                    </React.Fragment>
                ) :
                
                location.pathname === '/state' ?
                (  
                    <React.Fragment>
                        <InfoSplit onClick={e => caseTypes('cases')} isRed active={caseType === 'cases'} title='Covid-19 Cases' cases={roundingCounts(stateInfo?.todayCases)} total={roundingCounts(stateInfo?.active)}/>

                        <InfoSplit onClick={e => caseTypes('recovered')} active={caseType === 'recovered'} title='Recovered People' cases={roundingCounts(stateInfo?.todayRecovered)} total={roundingCounts(stateInfo?.recovered)}/>

                        <InfoSplit onClick={e => caseTypes('deaths')} isRed active={caseType === 'deaths'} title='Deaths' cases={roundingCounts(stateInfo?.todayDeaths)} total={roundingCounts(stateInfo?.deaths)}/>
                    </React.Fragment>
                ) :
                <div></div>
            }
            
       </div>
    )
}

export default withRouter(CaseInfo)