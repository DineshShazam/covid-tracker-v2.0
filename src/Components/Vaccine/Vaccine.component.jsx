import React,{useEffect,useState} from 'react'
import { useStateValue } from '../../Hooks/state'
import './Vaccine.css'
import {Card,CardContent,Typography} from '@material-ui/core'

const Vaccine = () => {

    const [{vaccineData,vaccineCandidates}] = useStateValue();

    // vaccine state 
    const [details,SetDetails] = useState({});

    useEffect(() => {
        const vaccine = vaccineData.find((val) => ( val.candidate === vaccineCandidates));
        SetDetails(vaccine);
    },[vaccineCandidates])

    return (
        <div className="vaccine">
            <Card className="vaccine__info">
                <CardContent>
                    <Typography>
                       <h2>Institution</h2> {details?.institutions}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Typography>
                       <h2>TrailPhase</h2> {details?.trialPhase} 
                    </Typography>
                </CardContent>
            </Card>
           <table className="gfg" style={{width:"100%"}}>
                {/* <tr>
                    <th>Institution:</th>
                    <td>{details?.institutions}</td>
                </tr>
                <tr>
                    <th>TrailPhase:</th>
                    <td>{details?.trialPhase}</td>
                </tr> */}
                <tr>
                    <th>Sponsers:</th>
                    <td>{details?.sponsors}</td>
                </tr>
                <tr>
                    <th>Details:</th>
                    <td><p>{details?.details}</p></td>
                </tr>
        </table>
        </div>
    )
}

export default Vaccine