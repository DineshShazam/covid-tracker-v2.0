import React from 'react';
import './info_split.css';
import {Card,CardContent,Typography} from '@material-ui/core'

const InfoSplit = ({title,cases,total,active,isRed,...props}) => {

    return (
        <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
           <CardContent>
               <Typography className='infoBox_title' color='textSecondary'>{title}</Typography>
               <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>TODAY: +{cases}</h2>
               <Typography className='infoBox__total'>{total} total</Typography>
           </CardContent>
       </Card>
    )
}

export default InfoSplit