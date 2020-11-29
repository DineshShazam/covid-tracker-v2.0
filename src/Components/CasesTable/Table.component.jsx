import React,{useEffect,useState} from 'react'
import numeral from 'numeral'
import './Table.css'
import axios from 'axios'
import { sortingData } from '../../Utils/utils'


const Table = () => {

    const [tableData,SetTableData] = useState([]);

    useEffect(()=>{
        axios.get('https://disease.sh/v3/covid-19/countries',{ crossdomain: true })
              .then(({data}) => {
                  let newData = sortingData(data);
                  SetTableData(newData)
              }).catch(err => console.log(`Error at table API, ${err}`));
    },[])

    return (
       <div className="table">
           {
               tableData?.map(({country,cases}) => (
                   <tr>
                       <td>{country}</td>
                       <td>{numeral(cases).format("0,0")}</td>
                   </tr>
               ))
           }
       </div>
    )
}

export default Table